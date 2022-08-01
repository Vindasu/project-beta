from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .models import AutomobileVO, Technician, Appointment

# Create your views here.

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer",
        "date_time",
        "reason",
    ]
    def get_extra_data(self, o):
        return {
            "technician": o.technician.name,
            "automobile": o.automobile.import_href,
        }

@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.get(import_href=content["automobile"])
            content["automobile"] = automobile
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_appointment(request, vin):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(vin=vin)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(vin=vin)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    # else: # PUT
    #     try:
    #         content = json.loads(request.body)
    #         auto = Automobile.objects.get(vin=vin)

    #         props = ["color", "year"]
    #         for prop in props:
    #             if prop in content:
    #                 setattr(auto, prop, content[prop])
    #         auto.save()
    #         return JsonResponse(
    #             auto,
    #             encoder=AutomobileEncoder,
    #             safe=False,
    #         )
    #     except Automobile.DoesNotExist:
    #         response = JsonResponse({"message": "Does not exist"})
    #         response.status_code = 404
    #         return response