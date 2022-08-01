from django.urls import path
from .views import api_appointment, api_appointments, api_technicians

urlpatterns = [
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:pk>/", api_appointment, name="api_appointment"),
    path("technicians/", api_technicians, name="api_technicians"),
]