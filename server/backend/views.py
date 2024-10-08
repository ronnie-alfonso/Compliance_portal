from django.shortcuts import render
from .serializers import Coursesserializers
from .models import Course
from rest_framework import viewsets,status
from rest_framework.response import Response

# Create your views here.


class ViewCourse(viewsets.ViewSet):
  
    def list(self, request):
        books = Course.objects.all()
        serializer = Coursesserializers(books, many=True)
        return Response(serializer.data)

    # Create a new book
    def create(self, request):
        serializer = Coursesserializers(data=request.data)
        if serializer.is_valid():
            print(request.data.get("course_name"))
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
    # Retrieve a book by its primary key (id)
    def retrieve(self, request, pk=None):
        try:
            book = Course.objects.get(pk=pk)
            serializer = Coursesserializers(book)
            return Response(serializer.data)
        except Course.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    # Update an existing book
    def update(self, request, pk=None):
        try:
            book = Course.objects.get(pk=pk)
            serializer = Coursesserializers(book, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Course.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    # Partially update an existing book
    def partial_update(self, request, pk=None):
        try:
            book = Course.objects.get(pk=pk)
            serializer = Coursesserializers(book, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Course.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    # Delete a book
    def destroy(self, request, pk=None):
        try:
            book = Course.objects.get(pk=pk)
            book.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)