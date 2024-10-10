from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=16)
    
    def __str__(self):
        return self.name
    
class Sizes(models.Model):
    name = models.CharField(max_length=4)
    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    storage = models.PositiveIntegerField()
    categories = models.ManyToManyField(Category, related_name="products")
    available_sizes = models.ManyToManyField(Sizes, related_name="availableSizes_products")
    out_of_storage_sizes = models.ManyToManyField(Sizes, related_name="OutOfStorageSizes_products")
    cart = models.ManyToManyField(User, blank=True, related_name="cart")
    image = models.ImageField(upload_to='products/', default='products/default-image.jpg')
    # selected_size
    # quantity_buying

    def __str__(self):
        return self.name
    
class Ordering(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ordering')
    products = models.ManyToManyField(Product, blank=False, null=False, related_name='ordering')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.BooleanField(default=False)

    def __str__(self):
        buyer_username = self.buyer.username if self.buyer and self.buyer.username else "Desconhecido"
        price_str = f"R${self.price}" if self.price is not None else "Preço não disponível"
        product_names = ", ".join([product.name for product in self.products.all()]) if self.products.exists() else "Produtos desconhecidos"

        return f"{buyer_username} ({price_str}): {product_names}"