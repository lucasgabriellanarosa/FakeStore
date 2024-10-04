# Generated by Django 4.0.5 on 2024-10-02 01:04

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='Sizes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('description', models.TextField()),
                ('storage', models.PositiveIntegerField()),
                ('image', models.ImageField(default='products/default-image.jpg', upload_to='products/')),
                ('available_sizes', models.ManyToManyField(related_name='availableSizes_products', to='api.sizes')),
                ('cart', models.ManyToManyField(blank=True, related_name='cart', to=settings.AUTH_USER_MODEL)),
                ('categories', models.ManyToManyField(related_name='products', to='api.category')),
                ('out_of_storage_sizes', models.ManyToManyField(related_name='OutOfStorageSizes_products', to='api.sizes')),
                ('wish_list', models.ManyToManyField(blank=True, related_name='wish_list', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
