from django.shortcuts import render, get_object_or_404

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Todo
from .serializers import TodoSerializer


class TodoListCreate(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_objects(self):
        return Todo.objects.all()
    
    def delete(self, request, id=None, format=None):
        todos = self.get_objects()
        todos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# TODO fix error handlings e.g. 404
class TodoView(APIView):
    def get_object(self, id):
        return Todo.objects.get(id=id)

    def get(self, request, id, format=None):
        todo = self.get_object(id)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, id, format=None):
        todo = self.get_object(id)
        print(request.data, id)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            print('\n\n\nvalid\n\n\n')
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id=None, format=None):
        todo = self.get_object(id)
        todo.delete()
        return Response({'id': id})
