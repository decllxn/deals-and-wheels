# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import Conversation, Message
from .serializers import MessageSerializer

User = get_user_model()


class ChatConsumer(AsyncWebsocketConsumer):
    """
    Handles real-time communication for a specific conversation.
    Each conversation has its own room group: 'chat_<conversation_id>'
    """

    async def connect(self):
        self.conversation_id = self.scope["url_route"]["kwargs"]["conversation_id"]
        self.room_group_name = f"chat_{self.conversation_id}"
        self.user = self.scope["user"]

        # Reject if user not authenticated
        if not self.user.is_authenticated:
            await self.close()
            return

        # Ensure user is a participant
        is_participant = await self._is_participant()
        if not is_participant:
            await self.close()
            return

        # Join the room
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        """
        Receive a message from WebSocket.
        Expected payload: {"text": "...", "quoted_message_id": optional}
        """
        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            return

        text = data.get("text")
        quoted_id = data.get("quoted_message_id")

        if not text:
            return  # Ignore empty messages

        # Save message to DB
        message = await self._create_message(text, quoted_id)

        # Serialize message for broadcast
        serialized = await self._serialize_message(message)

        # Broadcast to conversation group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat.message",
                "message": serialized,
            },
        )

    async def chat_message(self, event):
        """
        Called when a message is broadcast to the group.
        Sends serialized JSON to all connected clients in the room.
        """
        await self.send(text_data=json.dumps(event["message"]))

    # --- Helper methods (run in sync context) ---

    @database_sync_to_async
    def _is_participant(self):
        return Conversation.objects.filter(id=self.conversation_id, participants=self.user).exists()

    @database_sync_to_async
    def _create_message(self, text, quoted_id=None):
        conversation = get_object_or_404(Conversation, id=self.conversation_id)
        quoted = None
        if quoted_id:
            quoted = Message.objects.filter(id=quoted_id, conversation=conversation).first()
        msg = Message.objects.create(
            conversation=conversation,
            sender=self.user,
            text=text,
            quoted_message=quoted,
        )
        # Update conversation timestamp
        conversation.save(update_fields=["updated_at"])
        return msg

    @database_sync_to_async
    def _serialize_message(self, message):
        """Return JSON-serializable message data."""
        return MessageSerializer(message).data