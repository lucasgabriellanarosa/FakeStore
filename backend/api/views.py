from django.shortcuts import render
from django.http import JsonResponse
from .models import *
# Create your views here.

def getCategories(request):
    category_list = []
    
    categories = Category.objects.all()

    for category in categories:
        products = category.products.all()
        product_list = [
            {
                'id': product.id,
                'name': product.name,
                'price': str(product.price),
                'description': product.description,
                'storage': product.storage,
                'image': str(product.image),
            }
            for product in products
        ]
        
        category_list.append({
            'id': category.id,
            'name': category.name,
            'products': product_list
        })

    return JsonResponse({"categories": category_list}, safe=False)


def getProductsByCategory(request, category):
    products = list(Product.objects.filter(categories=category).values())
    return JsonResponse({"products": products}, safe=False)