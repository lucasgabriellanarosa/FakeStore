from django.urls import path
from .views import *

urlpatterns = [
    # Get
    path('getCategories/', getCategories),
    path('getProductsByCategory/<int:category>', getProductsByCategory),
    path('getProduct/<int:id>', getProduct),
    path('getUserCart/', getUserCart),

    # Post
    path('addProductToCart/', addProductToCart),
    path('removeProductFromCart/', removeProductFromCart),

    # Auth
    path('register/', registerUser),
    path('login/', loginUser),
    path('logout/', logoutUser),
    path('checkLogin/', checkLogin),
]
