# Generated by Django 4.0.5 on 2024-10-05 00:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='wish_list',
        ),
    ]
