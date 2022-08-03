from django.contrib import admin
from django.urls import path, include
from .views import api_list_sales, api_customer, api_show_customer, api_show_sales, api_employee, api_show_employee

urlpatterns = [
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:pk>/", api_show_sales, name="api_show_sales"),
    path("employees/", api_employee, name="api_employee"),
    path("employees/<int:pk>/", api_show_employee, name="api_show_employee"),
    path("customers/", api_customer, name="api_customer"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
]
