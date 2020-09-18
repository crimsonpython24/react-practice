from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'slug', 'first_name', 'last_name', 'email', 'avatar',
            'birthday', 'gender', 'places', 'links', 'introduction', 'education', 'work',
        ]
