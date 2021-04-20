from rest_framework import serializers
from .models import Book, Author, Genre
from jwt_auth.serializers import UserSerializer


class NestedBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'image')


class NestedAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'firstname', 'middlename', 'lastname')


class AuthorSerializer(serializers.ModelSerializer):
    books = NestedBookSerializer(many=True)

    class Meta:
        model = Author
        fields = ('id', 'firstname', 'middlename', 'lastname', 'books',)


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name')

# class CommentSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
#     class Meta:
#         model = Comment
#         fields = ('id', 'content', 'rating', 'user', 'timestamp')
class BookSerializer(serializers.ModelSerializer):

    author = NestedAuthorSerializer()
    genres = GenreSerializer(many=True)
    user = UserSerializer(read_only=True)
    # comment = CommentSerializer()

    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'image', 'price', 'summary',
                  'author', 'genres', 'user', 'rating',)
