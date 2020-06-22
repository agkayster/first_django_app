from django.db import models
from django.contrib.auth.models import User
from djmoney.models.fields import MoneyField
from djmoney.money import Money


# Create your models here.
class Author (models.Model):
    firstname = models.CharField(max_length=50)
    middlename = models.CharField(max_length=50, blank=True)
    lastname = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.firstname} {self.middlename} {self.lastname}'


class Genre (models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'


class Book (models.Model):
    title = models.CharField(max_length=50)
    author = models.ForeignKey(
        Author, related_name='books', on_delete=models.CASCADE)
    image = models.CharField(max_length=200)
    summary = models.TextField(blank=True)
    genres = models.ManyToManyField(Genre, related_name='books', blank=True)
    price = MoneyField(max_digits=3, decimal_places=2,
                       default_currency='GBP', blank=False, null=True)
    user = models.ForeignKey(User, related_name='books',
                             on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title} - {self.author}'
