from rest_framework import serializers
from .models import Todo, TodoSubitem


class TodoSerializer(serializers.ModelSerializer ):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'source', 'status', 'intensity', 'notes', 'due_date', 'completed', 'subitems', 'user']


class TodoSubitemSerializer(serializers.ModelSerializer ):
    class Meta:
        model = TodoSubitem
        fields = ['id', 'title', 'source', 'status', 'intensity', 'notes', 'user']
