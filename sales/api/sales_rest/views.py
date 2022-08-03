from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


# from sales_rest.acls import get_photo
from .models import AutomobileVO, Employee, Sale, Customer

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "color",
        "year",
        "vin",
    ]
class EmployeeEncoder(ModelEncoder):
    model = Employee
    properties = [
        "id",
        "name",
        "employee_number",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [ 
        "price",
        "customer",
        "employee",
        "automobile",
    ]
    encoders = {
        
        "employee": EmployeeEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
    def get_extra_data(self, o):
        return {
            "vin": o.automobile.vin,
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
        content= json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(import_href=content["automobile"])
            content["automobile"] = automobile
            
            employee = Employee.objects.get(id=content["employee"])
            content["employee"] = employee
            
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer

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
def api_show_sales(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
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
            sale = Sale.objects.get(id=pk)
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
            sale = Sale.objects.get(id=pk)
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
def api_employee(request):
    if request.method == "GET":
        employees = Employee.objects.all()
        return JsonResponse(
            {"employees": employees},
            encoder=EmployeeEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            employee = Employee.objects.create(**content)
            return JsonResponse(
                employee,
                encoder=EmployeeEncoder,
                safe=False,)
        except:
            response = JsonResponse(
                {"message": "Could not create the sales person"}
            )
            response.status_code = 400
            return response
        
        
        
    
@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_employee(request, pk):
    if request.method == "GET":
        try:
            employee = Employee.objects.get(id=pk)
            return JsonResponse(
                employee,
                encoder=EmployeeEncoder,
                safe=False
            )
        except Employee.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            employee = Employee.objects.get(id=pk)
            employee.delete()
            return JsonResponse(
                employee,
                encoder=SaleEncoder,
                safe=False,
            )
        except Employee.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            employee = Employee.objects.get(id=pk)
            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(employee, prop, content[prop])
            employee.save()
            return JsonResponse(
                employee,
                encoder=EmployeeEncoder,
                safe=False,
            )
        except Employee.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            # automobile = AutomobileVO.objects.get(import_href=content["automobile"])
            # content["automobile"] = automobile
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            employee = Customer.objects.get(id=pk)
            return JsonResponse(
                employee,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=Customer,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)
            props = ["name", "address","phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
