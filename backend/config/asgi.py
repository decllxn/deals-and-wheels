# config/asgi.py
import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import chat.routing  # Import your websocket routes

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Standard Django ASGI app for HTTP requests
django_asgi_app = get_asgi_application()

# ASGI application for both HTTP and WebSocket
application = ProtocolTypeRouter({
    "http": django_asgi_app,  # Handles standard HTTP requests
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})