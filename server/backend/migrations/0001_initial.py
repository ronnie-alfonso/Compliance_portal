# Generated by Django 5.1.1 on 2024-10-03 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_name', models.CharField(max_length=500)),
                ('image', models.CharField(max_length=500)),
                ('description', models.CharField(max_length=500)),
                ('pdf_name', models.CharField(max_length=500)),
                ('date_created', models.DateField(auto_now=True)),
            ],
        ),
    ]
