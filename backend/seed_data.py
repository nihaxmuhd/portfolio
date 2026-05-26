import os
import django
from datetime import date

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from django.contrib.auth.models import User
from portfolio_api.models import Project, Experience, Skill

def seed_database():
    print("Seeding database...")

    # 1. Create Superuser (Admin)
    # PLACEHOLDER: Change these default admin credentials before deploying
    admin_username = 'admin'
    admin_email = 'admin@example.com'
    admin_password = 'adminpassword'

    if not User.objects.filter(username=admin_username).exists():
        print(f"Creating superuser '{admin_username}'...")
        User.objects.create_superuser(username=admin_username, email=admin_email, password=admin_password)
        print("Superuser created successfully.")
    else:
        print(f"Superuser '{admin_username}' already exists.")

    # 2. Seed Skills
    # PLACEHOLDER: Customize your skills, categories, and proficiency levels below
    skills_data = [
        # Backend Skills
        {'name': 'Python', 'category': 'Backend', 'proficiency': 90, 'order': 1},
        {'name': 'Django', 'category': 'Backend', 'proficiency': 85, 'order': 2},
        {'name': 'Django REST Framework', 'category': 'Backend', 'proficiency': 85, 'order': 3},
        {'name': 'RESTful APIs', 'category': 'Backend', 'proficiency': 90, 'order': 4},
        {'name': 'Databases (SQL)', 'category': 'Backend', 'proficiency': 80, 'order': 5},
        
        # Frontend Skills
        {'name': 'JavaScript', 'category': 'Frontend', 'proficiency': 85, 'order': 1},
        {'name': 'React.js', 'category': 'Frontend', 'proficiency': 80, 'order': 2},
        {'name': 'Tailwind CSS', 'category': 'Frontend', 'proficiency': 90, 'order': 3},
        {'name': 'HTML5 & CSS3', 'category': 'Frontend', 'proficiency': 95, 'order': 4},
        
        # Tools & Others
        {'name': 'Git', 'category': 'Tools/Others', 'proficiency': 85, 'order': 1},
        {'name': 'GitHub', 'category': 'Tools/Others', 'proficiency': 90, 'order': 2},
        {'name': 'Postman', 'category': 'Tools/Others', 'proficiency': 80, 'order': 3},
        {'name': 'AI-assisted Development', 'category': 'Tools/Others', 'proficiency': 95, 'order': 4},
    ]

    for skill in skills_data:
        Skill.objects.get_or_create(
            name=skill['name'],
            defaults={
                'category': skill['category'],
                'proficiency': skill['proficiency'],
                'order': skill['order']
            }
        )
    print("Skills seeded.")

    # 3. Seed Experiences
    # PLACEHOLDER: Edit these experiences with your own professional timeline
    experiences_data = [
        {
            'company_name': 'Velmora Leather (Freelance)',
            'role': 'Full-Stack Developer',
            'start_date': date(2026, 1, 15),
            'end_date': None,
            'is_current': True,
            'description': 'Designed and developed a premium high-end luxury landing page and backend.\nImplemented scroll-linked shoe deconstruction web animations using GSAP and canvas.\nConnected Django backend REST endpoints with a React.js single-page application.',
            'order': 1
        },
        {
            'company_name': 'Zetca Live',
            'role': 'Software Engineer Intern',
            'start_date': date(2025, 9, 1),
            'end_date': date(2025, 12, 15),
            'is_current': False,
            'description': 'Modernized administrative dashboards using React and responsive design principles.\nImplemented robust JWT Authentication flow and automated refresh token mechanics.\nRefactored state management to synchronize frontend states with remote REST API databases.',
            'order': 2
        },
        {
            'company_name': 'Startup Incubator',
            'role': 'Business Management Intern',
            'start_date': date(2024, 6, 1),
            'end_date': date(2024, 8, 31),
            'is_current': False,
            'description': 'Bridged the gap between non-technical founders and developer teams.\nSpearheaded agile planning sessions and translated customer requirements into technical user stories.\nOptimized operations workflow saving 10+ hours of manual data entry per week.',
            'order': 3
        }
    ]

    for exp in experiences_data:
        Experience.objects.get_or_create(
            company_name=exp['company_name'],
            role=exp['role'],
            defaults={
                'start_date': exp['start_date'],
                'end_date': exp['end_date'],
                'is_current': exp['is_current'],
                'description': exp['description'],
                'order': exp['order']
            }
        )
    print("Experiences seeded.")

    # 4. Seed Projects
    # PLACEHOLDER: Edit these projects with your actual project details
    projects_data = [
        {
            'title': 'Velmora Leather Landing Page',
            'description': 'A visually stunning e-commerce landing page with rich, smooth scroll-triggered shoe deconstruction animations, premium interactive cards, and a minimalist design system.',
            'tech_stack': 'React.js, Tailwind CSS, GSAP, Canvas, Django, SQLite',
            'github_url': 'https://github.com/yourusername/velmora-leather',
            'live_url': 'https://velmoraleather.demo',
            'image_url': 'https://picsum.photos/id/101/600/400',
            'order': 1,
            'project_progress': 100,
            'status': 'Completed'
        },
        {
            'title': 'Zetca Live Dashboard',
            'description': 'A secure administrative panel providing real-time data visualisations of company metrics, user accounts, and billing history. Features full JWT session-handling.',
            'tech_stack': 'React.js, Tailwind CSS, Recharts, Django REST Framework, PostgreSQL',
            'github_url': 'https://github.com/yourusername/zetca-live-admin',
            'live_url': 'https://zetcalive.demo',
            'image_url': 'https://picsum.photos/id/102/600/400',
            'order': 2,
            'project_progress': 85,
            'status': 'In Progress'
        },
        {
            'title': 'Wallchemy Textures API',
            'description': 'A RESTful API database serving architectural textures and materials. Built with optimized Django queries, custom pagination, and complete CORS integration for public fetching.',
            'tech_stack': 'Python, Django REST Framework, SQLite, Postman',
            'github_url': 'https://github.com/yourusername/wallchemy-textures-api',
            'live_url': 'https://wallchemy.demo',
            'image_url': 'https://picsum.photos/id/103/600/400',
            'order': 3,
            'project_progress': 100,
            'status': 'Completed'
        }
    ]

    for proj in projects_data:
        Project.objects.get_or_create(
            title=proj['title'],
            defaults={
                'description': proj['description'],
                'tech_stack': proj['tech_stack'],
                'github_url': proj['github_url'],
                'live_url': proj['live_url'],
                'image_url': proj['image_url'],
                'order': proj['order'],
                'project_progress': proj['project_progress'],
                'status': proj['status']
            }
        )

    print("Projects seeded.")
    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed_database()
