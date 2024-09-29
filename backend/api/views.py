from django.shortcuts import render
from django.http import JsonResponse
from .models import *
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login

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

def getProduct(request, id):
    productData = Product.objects.get(id=id)

    product = {
        'id': productData.id,
        'name': productData.name,
        'price': str(productData.price),
        'description': productData.description,
        'storage': productData.storage,
        'image': str(productData.image),
        'categories': list(productData.categories.values()),
        'available_sizes': list(productData.available_sizes.values()),
        'out_of_storage_sizes': list(productData.out_of_storage_sizes.values()),
    }
    return JsonResponse({"product": product}, safe=False)


@csrf_exempt
def registerUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        new_user = User.objects.create_user(username=username, password=password)

        authenticated_user = authenticate(username=username, password=password)

        if authenticated_user is not None:
            login(request, authenticated_user)

        return JsonResponse({'message': 'User registered and logged in successfully'}, status=201)
    

@csrf_exempt
def loginUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        

@csrf_exempt
def checkLogin(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username, 'is_logged': True}, status=200)
    else:
        return JsonResponse({'is_logged': False}, status=200)