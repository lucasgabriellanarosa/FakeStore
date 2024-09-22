from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=16)
    
    def __str__(self):
        return self.name
    
class Sizes(models.Model):
    name = models.CharField(max_length=4)
    
class Product(models.Model):
    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    storage = models.PositiveIntegerField()
    categories = models.ManyToManyField(Category, related_name="products")
    available_sizes = models.ManyToManyField(Sizes, related_name="availableSizes_products")
    out_of_storage_sizes = models.ManyToManyField(Sizes, related_name="OutOfStorageSizes_products")
    wish_list = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="wish_list")
    cart = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="cart")

    def __str__(self):
        return self.name