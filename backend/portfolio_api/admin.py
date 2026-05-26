from django.contrib import admin
from .models import Experience, Project, ProjectImage, Skill


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'project_progress', 'order')
    search_fields = ('title', 'tech_stack')
    list_filter = ('status',)
    inlines = [ProjectImageInline]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company_name', 'start_date', 'is_current', 'order')
    search_fields = ('role', 'company_name')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'order')
    list_filter = ('category',)
    search_fields = ('name',)
