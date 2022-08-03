from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100, null=True, blank=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

class Technician(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    employee_num = models.PositiveSmallIntegerField(null=True, blank=True)

class Appointment(models.Model):
    vin = models.CharField(max_length=17, null=True, blank=True)
    customer = models.CharField(max_length=100, null=True, blank=True)
    date_time = models.DateTimeField(null=True, blank=True)
    # date = models.DateField(null=True, blank=True)
    # time = models.TimeField(null=True, blank=True)
    reason = models.CharField(max_length=100, null=True, blank=True)
    status = models.BooleanField(default=False, null=True, blank=True)
    vip = models.BooleanField(default=False, null=True, blank=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    # automobile = models.ForeignKey(
    #     AutomobileVO,
    #     related_name="appointments",
    #     on_delete=models.CASCADE,
    #     null=True,
    #     blank=True,
    # )