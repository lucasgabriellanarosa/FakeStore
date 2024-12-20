from django.shortcuts import render
from django.http import JsonResponse
from .models import *
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout

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
def logoutUser(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'is_logged': False}, status=200)
    
@csrf_exempt
def checkLogin(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username, 
                            'is_logged': True, 
                            'id': request.user.id}, status=200)
    else:
        return JsonResponse({'is_logged': False}, status=200)
    
@csrf_exempt
def getUserCart(request):
    if request.user.is_authenticated:
        user = request.user
        cart_items = list(Product.objects.filter(cart=user).order_by('name').values())

        return JsonResponse({'cart_items': cart_items}, status=200)
    

@csrf_exempt
def addProductToCart(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        productID = data.get('productID')

        product = Product.objects.get(pk=productID)

        user = request.user

        if product.cart.filter(id=user.id).exists():
            return JsonResponse({'added': False}, status=200)

        product.cart.add(user)

        return JsonResponse({'added': True}, status=200)
    

@csrf_exempt
def removeProductFromCart(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        productID = data.get('productID')

        product = Product.objects.get(pk=productID)
        user = request.user

        if product.cart.filter(id=user.id).exists():
            product.cart.remove(user)

            cart_items = list(Product.objects.filter(cart=user).order_by('name').values())

            return JsonResponse({'removed': True, 'cart_items': cart_items}, status=200)

        return JsonResponse({'removed': False}, status=200)
