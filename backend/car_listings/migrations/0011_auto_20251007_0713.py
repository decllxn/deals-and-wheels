from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ("car_listings", "0010_carlisting_slug_alter_carlisting_condition"),
    ]

    operations = [
        migrations.AddField(
            model_name="carlisting",
            name="slug",
            field=models.SlugField(unique=True, blank=True, max_length=300),
        ),
    ]