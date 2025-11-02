# chat/views.py
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

User = get_user_model()


# ✅ GET /chat/conversations/
class ConversationListView(generics.ListAPIView):
    """
    List all conversations for the authenticated user.
    Includes last message and participants.
    """
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(participants=self.request.user).order_by("-updated_at")


# ✅ POST /chat/conversations/start/
class StartConversationView(APIView):
    """
    Start a new conversation between the logged-in user and another user (dealer or buyer).
    Prevents duplicate conversations.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        other_user_id = request.data.get("dealer_id") or request.data.get("user_id")
        if not other_user_id:
            return Response({"error": "Missing dealer_id or user_id."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        other_user = get_object_or_404(User, id=other_user_id)

        # Prevent duplicate conversations
        existing = (
            Conversation.objects
            .filter(participants=user)
            .filter(participants=other_user)
            .first()
        )
        if existing:
            return Response({"conversation_id": existing.id}, status=status.HTTP_200_OK)

        convo = Conversation.objects.create()
        convo.participants.add(user, other_user)
        convo.save()

        return Response(
            {"conversation_id": convo.id, "message": "Conversation started."},
            status=status.HTTP_201_CREATED
        )


# ✅ GET /chat/messages/<conversation_id>/
class MessageListView(generics.ListAPIView):
    """
    Fetch messages for a conversation (ordered by time).
    """
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        convo_id = self.kwargs["conversation_id"]
        conversation = get_object_or_404(Conversation, id=convo_id, participants=self.request.user)
        return conversation.messages.select_related("sender", "quoted_message").order_by("created_at")


# ✅ POST /chat/messages/send/
class SendMessageView(APIView):
    """
    Send a new message in a conversation.
    Supports quoting another message.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        convo_id = request.data.get("conversation_id")
        text = request.data.get("text")
        quoted_id = request.data.get("quoted_message_id")

        if not convo_id or not text:
            return Response({"error": "conversation_id and text are required."},
                            status=status.HTTP_400_BAD_REQUEST)

        conversation = get_object_or_404(Conversation, id=convo_id, participants=request.user)

        quoted_msg = None
        if quoted_id:
            quoted_msg = Message.objects.filter(id=quoted_id, conversation=conversation).first()

        msg = Message.objects.create(
            conversation=conversation,
            sender=request.user,
            text=text,
            quoted_message=quoted_msg,
        )

        # Update conversation timestamp
        conversation.save(update_fields=["updated_at"])

        return Response(MessageSerializer(msg, context={"request": request}).data, status=status.HTTP_201_CREATED)