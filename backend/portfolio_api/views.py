from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.utils import timezone
from .models import Project, Experience, Skill
from .serializers import ProjectSerializer, ExperienceSerializer, SkillSerializer
from .gemini_client import GeminiChatError, generate_chat_reply

# PLACEHOLDER: Custom analytics or visitor logging can be added in API hooks here

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authenticated admin/staff users to perform write actions (POST, PUT, PATCH, DELETE).
    Unauthenticated users can perform read operations (GET, HEAD, OPTIONS).
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsAdminOrReadOnly]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrReadOnly]


class CustomAuthToken(APIView):
    """
    Custom endpoint to authenticate a user, returning a token and user metadata.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_staff:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'username': user.username,
                    'is_staff': user.is_staff
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'non_field_errors': ['User is not authorized as an administrator.']
                }, status=status.HTTP_403_FORBIDDEN)
        return Response({
            'non_field_errors': ['Unable to log in with provided credentials.']
        }, status=status.HTTP_400_BAD_REQUEST)


class ChatAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        message = str(request.data.get('message', '')).strip()
        history = request.data.get('history') or []

        if not message:
            return Response({
                'error': 'Please enter a message before sending.',
            }, status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(history, list):
            history = []

        try:
            reply = generate_chat_reply(message=message, history=history[-8:])
        except GeminiChatError as exc:
            return Response({
                'error': str(exc),
                'reply': "I couldn't answer that just now, but you can still explore Nihad's projects or use the contact section to reach out directly.",
                'timestamp': timezone.now().isoformat(),
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        except Exception:
            return Response({
                'error': 'Something went wrong while talking to the AI assistant.',
                'reply': "I'm having trouble responding right now. Please try again soon or check the portfolio sections directly.",
                'timestamp': timezone.now().isoformat(),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            'reply': reply,
            'timestamp': timezone.now().isoformat(),
        }, status=status.HTTP_200_OK)

