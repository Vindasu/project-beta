from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .models import AutomobileVO, SalesPerson, Sale, PotentialCustomer

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_number",
    ]

class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "sales_person",
        "customer",
        "price",
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": PotentialCustomerEncoder(),
    }
    def get_extra_data(self, o):
        return {
            "automobile": o.automobile.import_href,
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
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(import_href=content["automobile"])
            content["automobile"] = automobile
            # sales_person = SalesPerson.objects.get(content["employee_number"])
            # content["employee_number"] = sales_person
            # customer = PotentialCustomer.objects.get(content["name"])
            # content["name"] = customer
        except:
            response = JsonResponse(
                {"message": "Could not create the sale"}
            )
            response.status_code = 404
            return response
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )

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
    else: # PUT
        try:
            content = json.loads(request.body)
            sale = Sale.objects.get(vin=vin)
            props = ["price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    

@require_http_methods(["GET", "POST"])
def api_sales_person(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
        except:
            response = JsonResponse(
                {"message": "Could not create the sales person"}
            )
            response.status_code = 400
            return response
        salesperson = SalesPerson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )
    
@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales_person(request, pk):
    if request.method == "GET":
        try:
            employee = SalesPerson.objects.get(employee_number=pk)
            return JsonResponse(
                employee,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            employee = SalesPerson.objects.get(employee_number=pk)
            employee.delete()
            return JsonResponse(
                employee,
                encoder=SaleEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            employee = SalesPerson.objects.get(employee_number=pk)
            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(employee, prop, content[prop])
            employee.save()
            return JsonResponse(
                employee,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def api_potential_customer(request):
    if request.method == "GET":
        customers = PotentialCustomer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=PotentialCustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response
        customer = PotentialCustomer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=PotentialCustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_potential_customer(request, pk):
    if request.method == "GET":
        try:
            employee = PotentialCustomer.objects.get(id=pk)
            return JsonResponse(
                employee,
                encoder=PotentialCustomerEncoder,
                safe=False
            )
        except PotentialCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = PotentialCustomer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=PotentialCustomer,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customer = PotentialCustomer.objects.get(id=pk)
            props = ["name", "address","phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response