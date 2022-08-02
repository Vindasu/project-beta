from django.contrib import admin
from django.urls import path, include
from .views import api_list_sales, api_potential_customer, api_show_potential_customer, api_show_sales, api_sales_person, api_show_sales_person

urlpatterns = [
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:pk>/", api_show_sales, name="api_show_sales"),
    path("employees/", api_sales_person, name="api_sales_person"),
    path("employees/<int:pk>/", api_show_sales_person, name="api_show_sales_person"),
    path("customers/", api_potential_customer, name="api_potential_customer"),
    path("customers/<int:pk>/", api_show_potential_customer, name="api_show_potential_customer"),
]
