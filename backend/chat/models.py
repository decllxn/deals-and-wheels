from django.db import models
from django.conf import settings
from django.utils import timezone


class Conversation(models.Model):
    """
    Represents a chat between two or more users.
    For your current use case: dealer ↔ buyer.
    """
    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="chat_conversations",
        blank=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def last_message(self):
        """Return the most recent message in this conversation."""
        return self.messages.order_by("-created_at").first()

    def __str__(self):
        users = ", ".join([user.email for user in self.participants.all()])
        return f"Conversation ({users})"


class Message(models.Model):
    """
    Individual message within a conversation.
    """
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_messages"
    )
    text = models.TextField(blank=True, null=True)
    quoted_message = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="quoted_in"
    )
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["created_at"]
        indexes = [
            models.Index(fields=["conversation", "created_at"]),
            models.Index(fields=["sender"]),
        ]

    def __str__(self):
        preview = (self.text[:30] + "...") if self.text else "[no text]"
        return f"From {self.sender.email}: {preview}"

    def quote_text(self):
        """Return text snippet of quoted message if any."""
        if self.quoted_message and self.quoted_message.text:
            return self.quoted_message.text[:100]
        return None