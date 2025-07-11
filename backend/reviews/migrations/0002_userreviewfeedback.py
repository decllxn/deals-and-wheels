# Generated by Django 5.1.7 on 2025-04-09 08:43

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserReviewFeedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section', models.CharField(choices=[('exterior', 'Exterior'), ('interior', 'Interior'), ('performance', 'Performance'), ('comfort', 'Comfort'), ('safety', 'Safety'), ('technology', 'Technology'), ('value', 'Value for Money')], max_length=50)),
                ('rating', models.PositiveIntegerField(default=5)),
                ('feedback', models.TextField()),
                ('review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_feedbacks', to='reviews.review')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
