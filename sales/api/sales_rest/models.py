from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100, null=True, blank=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)


class Employee(models.Model):
    name = models.CharField(max_length=200,  null=True, blank=True)
    employee_number = models.PositiveSmallIntegerField(default=1)

    def get_api_url(self):
        return reverse("api_employee", kwargs={"pk": self.pk})


class Customer(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=200, null=True, blank=True)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})


class Sale(models.Model):
    employee = models.ForeignKey(
        Employee,
        related_name="employees",
        on_delete=models.CASCADE, null=True,
        blank = True,
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE, null = True,
        blank = True,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customers",
        on_delete=models.CASCADE,null = True,
        blank = True,
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, null = True)

    def get_api_url(self):
        return reverse("api_list_sales", kwargs={"pk": self.pk})

    # picture_url = models.URLField(null = True)
