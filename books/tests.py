from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from .models import Genre, Author, Book

# Create your tests here.


class BooksTests(APITestCase):

    def setUp(self):
        user = User.objects.create(username='admin', email='ejike@gmail.com')
        author = Author.objects.create(
            firstname='Onuora', middlename='', lastname='Nzekwu')
        genre = Genre.objects.create(name='Comedy')[1], Genre.objects.create(
            name='Fiction')[4], Genre.objects.create(name='Thriller')[6]
        book = Book.objects.create(
            title='Eze goes to School', author=author,
            image='https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1389285032l/20498940.jpg',
            user=user)
        summary = '',
        price = None,
        book.genres.set([genre])  # Have to use `set` with M:M relationships

    def test_books_index(self):
        """
        Should return an array of books
        """

        url = reverse('books-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [{
            'id': 1,
            'title': 'Eze goes to School',
            'author': {
                'id': 1,
                'firstname': 'Onuora',
                'middlename': '',
                'lastname': 'Nzekwu'
            },
            'image': 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1389285032l/20498940.jpg',
            'price': None,
            'summary': '',

            'genres': [{
                'id': 1,
                'name': 'Comedy'
            },
                {
                'id': 4,
                'name': 'Fiction'
            },
                {
                'id': 6,
                'name': 'Thriller'
            }],
            'user': {
                'username': 'admin',
                'email': 'ejike@gmail.com'
            }
        }])


# class BooksTests(APITestCase):

#     def setUp(self):
#         # create a test user
#         user = User.objects.create(username='admin', email='ejike@gmail.com')
#         author = Author.objects.create(
#             firstname='Onuora', middlename='', lastname='Nzekwu')
#         genre = Genre.objects.create(name='Comedy')
#         # add the user to the book
#         book = Book.objects.create(
#             title='Eze goes to School', author=author,
#             image='https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1389285032l/20498940.jpg',
#             user=user)
#         book.genres.set([genre])

#         # authenticate the client
#         self.client.force_authenticate(user=user)

#     def test_books_create(self):
#         """
#         Should return an array of books
#         """

#         url = reverse('books-list')
#         data = {
#             'title': 'The Lord of the Rings',
#             'image': 'http://i.imgur.com/1KLiyRc',
#             'author': 1,
#             'genres': [1]
#         }
#         response = self.client.post(url, data)

#         self.assertEqual(response.status_code, 201)
#         self.assertEqual(Book.objects.count(), 2)
#         self.assertJSONEqual(response.content, {

#             'author': {
#                 'id': 1,
#                 'firstname': 'Onuora',
#                 'middlename': '',
#                 'lastname': 'Nzekwu'
#             },
#             'genres': [{
#                 'id': 1,
#                 'name': 'Comedy'
#             },
#                 {
#                 'id': 4,
#                 'name': 'Fiction'
#             },
#                 {
#                 'id': 6,
#                 'name': 'Thriller'
#             }],
#             'id': 2,
#             'image': 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1389285032l/20498940.jpg',
#             'title': 'Eze goes to School',
#             'user': {
#                 'username': 'admin',
#                 'email': 'ejike@gmail.com'
#             }

#         })

#         self.client.force_authenticate(user=None)  # remove authentication
#         response = self.client.post(url, data)
#         self.assertEqual(response.status_code, 401)
