from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'name', 'status', 'intensity', 'notes', 'created_at', 'due_on')
