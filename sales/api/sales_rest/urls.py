from django.contrib import admin
from django.urls import path, include
from .views import api_list_sales, api_show_sales

urlpatterns = [
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:pk>/", api_show_sales, name="api_show_sales")
]
