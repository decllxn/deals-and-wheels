# chat/urls.py
from django.urls import path
from .views import (
    ConversationListView,
    StartConversationView,
    MessageListView,
    SendMessageView,
)

urlpatterns = [
    # List all conversations
    path("conversations/", ConversationListView.as_view(), name="conversation-list"),

    # Start a new conversation
    path("conversations/start/", StartConversationView.as_view(), name="start-conversation"),

    # Get all messages for a specific conversation
    path("messages/<int:conversation_id>/", MessageListView.as_view(), name="message-list"),

    # Send a new message
    path("messages/send/", SendMessageView.as_view(), name="send-message"),
]