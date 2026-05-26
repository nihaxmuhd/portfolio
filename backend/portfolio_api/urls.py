from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ExperienceViewSet, SkillViewSet, CustomAuthToken, ChatAPIView, ResumeViewSet
from .views import ContactAPIView

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'resume', ResumeViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('login/', CustomAuthToken.as_view(), name='api_login'),
    path('chat/', ChatAPIView.as_view(), name='api_chat'),
    path('', include(router.urls)),
    path('contact/', ContactAPIView.as_view()),
]
