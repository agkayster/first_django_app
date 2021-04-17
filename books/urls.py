from django.urls import path, include
# from django.conf.urls import url
from .views import BookListView, BookDetailView, AuthorListView, AuthorDetailView



urlpatterns = [
    path('authors/', AuthorListView.as_view(), name='authors-list'),
    path('authors/<int:pk>/', AuthorDetailView.as_view(), name='authors-detail'),
    path('books/', BookListView.as_view(), name='books-list'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='books-detail'),
    # path(r'^ratings/', include('star_ratings.urls')),
]
