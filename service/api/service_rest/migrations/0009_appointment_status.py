# Generated by Django 4.0.3 on 2022-08-03 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0008_remove_appointment_date_remove_appointment_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='status',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
