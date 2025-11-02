# chat/admin.py
from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldAdmin
from .models import Conversation, Message


# ---------------------------
# Inline for Messages in Conversation
# ---------------------------
class MessageInline(admin.TabularInline):
    model = Message
    extra = 0
    readonly_fields = ("sender", "text", "quoted_message", "is_read", "created_at")
    fields = ("sender", "text", "quoted_message", "is_read", "created_at")
    show_change_link = True  # Allow opening message for detail

    def has_add_permission(self, request, obj=None):
        # Prevent adding messages from admin
        return False


# ---------------------------
# Conversation Admin
# ---------------------------
@admin.register(Conversation)
class ConversationAdmin(UnfoldAdmin):
    list_display = ("id", "participant_list", "created_at", "updated_at", "last_message_preview")
    search_fields = ("participants__email",)
    ordering = ("-updated_at",)
    readonly_fields = ("created_at", "updated_at")
    inlines = [MessageInline]

    def participant_list(self, obj):
        return ", ".join([user.email for user in obj.participants.all()])
    participant_list.short_description = "Participants"

    def last_message_preview(self, obj):
        last_msg = obj.last_message()
        if last_msg:
            text = last_msg.text or "[no text]"
            return f"{last_msg.sender.email}: {text[:50]}{'...' if len(text) > 50 else ''}"
        return "-"
    last_message_preview.short_description = "Last Message"


# ---------------------------
# Message Admin
# ---------------------------
@admin.register(Message)
class MessageAdmin(UnfoldAdmin):
    list_display = ("id", "conversation_id", "sender_email", "short_text", "quoted_message_preview", "is_read", "created_at")
    search_fields = ("text", "sender__email", "conversation__id")
    list_filter = ("is_read", "created_at")
    ordering = ("-created_at",)
    readonly_fields = ("conversation", "sender", "text", "quoted_message", "is_read", "created_at")

    def conversation_id(self, obj):
        return obj.conversation.id
    conversation_id.short_description = "Conversation"

    def sender_email(self, obj):
        return obj.sender.email
    sender_email.short_description = "Sender"

    def short_text(self, obj):
        text = obj.text or "[no text]"
        return f"{text[:50]}{'...' if len(text) > 50 else ''}"
    short_text.short_description = "Message"

    def quoted_message_preview(self, obj):
        if obj.quoted_message:
            text = obj.quoted_message.text or "[no text]"
            return f"{obj.quoted_message.sender.email}: {text[:50]}{'...' if len(text) > 50 else ''}"
        return "-"
    quoted_message_preview.short_description = "Quoted Message"