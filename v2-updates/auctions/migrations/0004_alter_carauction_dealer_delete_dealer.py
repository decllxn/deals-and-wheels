# Generated by Django 5.1.7 on 2025-04-05 12:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0003_alter_carauction_dealer'),
        ('dealers', '0003_remove_dealer_email_remove_dealer_phone_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carauction',
            name='dealer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='carauctions', to='dealers.dealer'),
        ),
        migrations.DeleteModel(
            name='Dealer',
        ),
    ]
