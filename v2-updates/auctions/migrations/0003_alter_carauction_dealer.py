# Generated by Django 5.1.7 on 2025-04-05 11:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0002_auctionhouse_dealer_carauction_auction_house_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carauction',
            name='dealer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='carauctions', to='auctions.dealer'),
        ),
    ]
