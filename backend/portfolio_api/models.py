from django.core.validators import FileExtensionValidator
from django.db import models

# PLACEHOLDER: You can extend these models with more fields if needed (e.g., tags, certificates)

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.CharField(max_length=500, help_text="Comma-separated list of tech stacks, e.g., React, Django, PostgreSQL")
    github_url = models.URLField(max_length=500, blank=True, null=True)
    live_url = models.URLField(max_length=500, blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True, help_text="Link to hosting image or public image asset")
    order = models.IntegerField(default=0, help_text="Sort order for listing projects in frontend")
    project_progress = models.IntegerField(default=100, help_text="Percentage progress from 0 to 100")
    status = models.CharField(max_length=50, default='Completed', choices=[('Completed', 'Completed'), ('In Progress', 'In Progress'), ('Planning', 'Planning')])
    date_created = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='project_images', on_delete=models.CASCADE)
    image = models.FileField(
        upload_to='projects/',
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'])],
    )
    order = models.IntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"Image {self.pk} for {self.project.title}"



class Experience(models.Model):
    company_name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True, help_text="Leave blank if currently working here")
    is_current = models.BooleanField(default=False)
    description = models.TextField(help_text="Bullet points describing responsibilities, separate by newlines or JSON")
    order = models.IntegerField(default=0, help_text="Sort order for timeline")

    class Meta:
        ordering = ['order', '-start_date']

    def __str__(self):
        return f"{self.role} at {self.company_name}"


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Backend', 'Backend'),
        ('Frontend', 'Frontend'),
        ('Tools/Others', 'Tools/Others'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(default=80, help_text="Proficiency percentage from 0 to 100")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return f"{self.name} ({self.category})"

