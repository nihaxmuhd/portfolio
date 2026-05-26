from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from .models import Project, ProjectImage, Experience, Skill

class PortfolioAPIPermissionsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create normal and admin users
        self.admin_user = User.objects.create_superuser(username='admin', email='a@test.com', password='adminpass')
        self.regular_user = User.objects.create_user(username='regular', email='r@test.com', password='regpass')
        
        # Generate token for admin
        self.admin_token, _ = Token.objects.get_or_create(user=self.admin_user)
        
        # Seed initial model instance for testing PUT/DELETE
        self.project = Project.objects.create(
            title='Test Project',
            description='Test description',
            tech_stack='Python, Django',
            github_url='http://github.com',
            order=0
        )
        
        # Define URLs
        self.list_url = reverse('project-list')
        self.detail_url = reverse('project-detail', kwargs={'pk': self.project.pk})

    def test_public_user_can_read_projects(self):
        """Verify unauthenticated user can list projects."""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_public_user_cannot_create_project(self):
        """Verify unauthenticated user cannot POST a project."""
        payload = {
            'title': 'New Project',
            'description': 'No auth',
            'tech_stack': 'React'
        }
        response = self.client.post(self.list_url, payload)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_public_user_cannot_update_project(self):
        """Verify unauthenticated user cannot PUT a project."""
        payload = {'title': 'Updated Title'}
        response = self.client.put(self.detail_url, payload)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_public_user_cannot_delete_project(self):
        """Verify unauthenticated user cannot DELETE a project."""
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_user_can_create_project(self):
        """Verify authenticated admin token can POST a project."""
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_token.key)
        payload = {
            'title': 'Admin Project',
            'description': 'Auth check',
            'tech_stack': 'React, Vite',
            'github_url': 'https://github.com',
            'order': 2
        }
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 2)

    def test_admin_user_can_update_project(self):
        """Verify authenticated admin token can PUT a project."""
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_token.key)
        payload = {
            'title': 'Updated Title By Admin',
            'description': 'Updated desc',
            'tech_stack': 'Python, DRF',
            'github_url': 'https://github.com',
            'order': 1
        }
        response = self.client.put(self.detail_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project.refresh_from_db()
        self.assertEqual(self.project.title, 'Updated Title By Admin')

    def test_admin_user_can_delete_project(self):
        """Verify authenticated admin token can DELETE a project."""
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_token.key)
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Project.objects.count(), 0)

    def test_admin_user_can_create_project_with_uploaded_images(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_token.key)
        payload = {
            'title': 'Gallery Project',
            'description': 'Multipart upload check',
            'tech_stack': 'React, Django',
            'status': 'Completed',
            'project_progress': 100,
            'order': 5,
            'new_images': [
                SimpleUploadedFile('cover-one.jpg', b'filecontent-1', content_type='image/jpeg'),
                SimpleUploadedFile('cover-two.png', b'filecontent-2', content_type='image/png'),
            ],
        }

        response = self.client.post(self.list_url, payload, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ProjectImage.objects.filter(project_id=response.data['id']).count(), 2)
        self.assertEqual(len(response.data['gallery_images']), 2)

    def test_admin_user_can_update_project_gallery(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_token.key)
        existing_image = ProjectImage.objects.create(
            project=self.project,
            image=SimpleUploadedFile('existing.jpg', b'existing-file', content_type='image/jpeg'),
            order=0,
        )
        payload = {
            'title': 'Updated Title By Admin',
            'description': 'Updated desc',
            'tech_stack': 'Python, DRF',
            'github_url': 'https://github.com',
            'live_url': '',
            'image_url': '',
            'status': 'Completed',
            'project_progress': 100,
            'order': 1,
            'sync_existing_images': '1',
            'existing_image_ids': [str(existing_image.id)],
            'new_images': [
                SimpleUploadedFile('replacement.webp', b'replacement-file', content_type='image/webp'),
            ],
        }

        response = self.client.put(self.detail_url, payload, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project.refresh_from_db()
        self.assertEqual(self.project.project_images.count(), 2)
        self.assertEqual(len(response.data['gallery_images']), 2)

