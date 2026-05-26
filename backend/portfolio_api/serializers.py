from rest_framework import serializers
from .models import Experience, Project, ProjectImage, Skill

# PLACEHOLDER: Define extra validation or field formatting logic here if required

class ProjectImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectImage
        fields = ['id', 'order', 'url']

    def get_url(self, obj):
        request = self.context.get('request')
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class ProjectSerializer(serializers.ModelSerializer):
    project_images = ProjectImageSerializer(many=True, read_only=True)
    gallery_images = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'

    def get_gallery_images(self, obj):
        uploaded_images = [
            {
                'id': image.id,
                'url': self.fields['project_images'].child.get_url(image),
                'source': 'upload',
            }
            for image in obj.project_images.all()
        ]

        if uploaded_images:
            return uploaded_images

        if obj.image_url:
            return [{
                'id': f'legacy-{obj.pk}',
                'url': obj.image_url,
                'source': 'url',
            }]

        return []

    def create(self, validated_data):
        request = self.context.get('request')
        project = Project.objects.create(**validated_data)
        self._sync_images(project, request, is_update=False)
        return project

    def update(self, instance, validated_data):
        request = self.context.get('request')

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        self._sync_images(instance, request, is_update=True)
        return instance

    def _sync_images(self, project, request, is_update):
        if not request:
            return

        sync_existing_images = str(request.data.get('sync_existing_images', '')).lower() in {'1', 'true', 'yes'}
        keep_ids = self._extract_list(request, 'existing_image_ids')
        new_images = request.FILES.getlist('new_images')

        if is_update and sync_existing_images:
            keep_ids = {int(image_id) for image_id in (keep_ids or []) if str(image_id).strip()}
            project.project_images.exclude(id__in=keep_ids).delete()

        start_order = project.project_images.count()
        for index, image in enumerate(new_images):
            ProjectImage.objects.create(
                project=project,
                image=image,
                order=start_order + index,
            )

    def _extract_list(self, request, field_name):
        if hasattr(request.data, 'getlist'):
            values = request.data.getlist(field_name)
            if values:
                return values

        value = request.data.get(field_name)
        if value in (None, '', []):
            return None
        if isinstance(value, list):
            return value
        return [value]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
