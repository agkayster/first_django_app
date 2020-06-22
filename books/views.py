from django.http import Http404
from django.views import View
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_422_UNPROCESSABLE_ENTITY
from .models import Author, Book
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly
from .serializers import AuthorSerializer, BookSerializer

# Create your views here.


class BookListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
        return Response(serializer.data, status=201)
        return Response(serializer.errors, status=422)


class AuthorListView(APIView):
    def get(self, request):
        authors = Author.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=201)
        return Response(serializer.errors, status=422)


class BookDetailView(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get_book(self, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise Http404

        return book

    def get(self, _request, pk):
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)

    def put(self, request, pk):
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        book = Book.objects.get(pk=pk)
        book.delete()
        return Response(status=204)


class AuthorDetailView(APIView):
    def get(self, _request, pk):
        author = Author.objects.get(pk=pk)
        serializer = AuthorSerializer(author)
        return Response(serializer.data)

    def put(self, request, pk):
        author = Author.object.get(pk=pk)
        serializer = AuthorSerializer(author, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        author = Author.objects.get(pk=pk)
        author.delete()
        return Response(status=204)
