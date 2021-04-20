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


# class Comment(models.Model):
#     content = models.TextField(blank=True)
#     rating = models.IntegerField()
#     user = models.ForeignKey(User, related_name="comment", on_delete=models.CASCADE)
#     timestamp = models.DateTimeField(auto_now_add=False)

#     def __str__(self):
#         return f'{self.content} - {self.user}'
    

class Book (models.Model):
    title = models.CharField(max_length=50)
    author = models.ForeignKey(
        Author, related_name='books', on_delete=models.CASCADE)
    image = models.CharField(max_length=200)
    summary = models.TextField(blank=True)
    # comment = models.ForeignKey(Comment, related_name='books', blank=True, on_delete=models.CASCADE)
    genres = models.ManyToManyField(Genre, related_name='books', blank=True)
    price = MoneyField(max_digits=4, decimal_places=2,
                       default_currency='GBP', blank=False, null=True)
    user = models.ForeignKey(User, related_name='books',
                             on_delete=models.CASCADE)
    rating = models.IntegerField()

    def __str__(self):
        return f'{self.title} - {self.author}'
    
    
