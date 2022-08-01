from django.db import models

# Create your models here.

class SalesPerson(models.Model):
    name = models.CharField(max_length=200,  null=True, blank=True)
    employee_number = models.PositiveSmallIntegerField(default=1)

class PotentialCustomer(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=200, null=True, blank=True)
