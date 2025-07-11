# Generated by Django 5.1.7 on 2025-04-05 12:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models

def set_default_user_for_dealers(apps, schema_editor):
    """Sets a default user for existing dealers.
    You'll need to decide how to handle this:
    1. Link to an existing default user.
    2. Create a temporary default user.
    3. Set the field to None (if null=True is allowed).
    """
    Dealer = apps.get_model('dealers', 'Dealer')
    User = apps.get_model(settings.AUTH_USER_MODEL.split('.')[0], settings.AUTH_USER_MODEL.split('.')[1])

    # Option 1: Link to an existing default user (replace 'default@example.com')
    try:
        default_user = User.objects.get(email='default_dealer@example.com')
        for dealer in Dealer.objects.all():
            dealer.user = default_user
            dealer.save()
    except User.DoesNotExist:
        print("Warning: Default user 'default_dealer@example.com' not found. Existing dealers will not be linked.")

    # Option 2: Create a temporary default user (only run this ONCE)
    # try:
    #     default_user = User.objects.create(email='default_dealer@example.com', first_name='Default', last_name='Dealer')
    #     for dealer in Dealer.objects.all():
    #         dealer.user = default_user
    #         dealer.save()
    # except Exception as e:
    #     print(f"Error creating default user: {e}")

    # Option 3: Set the user field to None (if null=True in your model)
    # for dealer in Dealer.objects.all():
    #     dealer.user = None
    #     dealer.save()

class Migration(migrations.Migration):

    dependencies = [
        ('dealers', '0002_remove_dealer_years_in_business'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dealer',
            name='email',
        ),
        migrations.RemoveField(
            model_name='dealer',
            name='phone_number',
        ),
        migrations.AddField(
            model_name='dealer',
            name='user',
            field=models.OneToOneField(
                null=True,  # Allow null temporarily if needed
                on_delete=django.db.models.deletion.CASCADE,
                related_name='dealer_profile',
                to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.RunPython(set_default_user_for_dealers),
        migrations.AlterField(
            model_name='dealer',
            name='user',
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='dealer_profile',
                to=settings.AUTH_USER_MODEL
            ),
        ),
    ]