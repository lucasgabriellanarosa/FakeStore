from django.urls import path
from .views import *

urlpatterns = [
    path('getCategories/', getCategories),
    path('getProductsByCategory/<int:category>', getProductsByCategory),
    path('getProduct/<int:id>', getProduct),
]

