from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .models import AutomobileVO, SalesPerson, Sale, PotentialCustomer

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
    ]
    def get_extra_data(self, o):
        return {
            "sales_person": o.sales_person.name,
            "automobile": o.automobile.import_href,
            "customer": o.potential_customer.name,
        }

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.get(import_href=content["automobile"])
            content["automobile"] = automobile
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sale"}
            )
            response.status_code = 404
            return response

    
@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales(request, vin):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(vin=vin)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(vin=vin)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

