# chat/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Conversation, Message

User = get_user_model()


class UserShortSerializer(serializers.ModelSerializer):
    """Minimal user info for chat participants and senders."""
    class Meta:
        model = User
        fields = ["id", "email"]


class MessageSerializer(serializers.ModelSerializer):
    sender = UserShortSerializer(read_only=True)
    quoted_message = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            "id",
            "conversation",
            "sender",
            "text",
            "quoted_message",
            "is_read",
            "created_at",
        ]
        read_only_fields = ["id", "sender", "created_at"]

    def get_quoted_message(self, obj):
        """Return minimal info about quoted message."""
        if obj.quoted_message:
            return {
                "id": obj.quoted_message.id,
                "text": obj.quoted_message.text[:80],
                "sender": obj.quoted_message.sender.email,
            }
        return None

    def create(self, validated_data):
        """Attach the logged-in user as sender automatically."""
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            validated_data["sender"] = request.user
        return super().create(validated_data)


class ConversationSerializer(serializers.ModelSerializer):
    participants = UserShortSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ["id", "participants", "created_at", "updated_at", "last_message"]

    def get_last_message(self, obj):
        msg = obj.last_message()
        if msg:
            return MessageSerializer(msg).data
        return None