# Generated by Django 3.2.13 on 2022-06-27 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_auto_20220627_1315'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='tags',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
