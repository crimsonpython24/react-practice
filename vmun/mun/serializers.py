from rest_framework import serializers
from .models import Conference, Committee, Delegate


class ConferenceSerializer(serializers.ModelSerializer ):
    class Meta:
        model = Conference
        fields = ['id', 'title', 'source', 'status', 'intensity', 'notes', 'due_date', 'completed', 'subitems', 'user']


class CommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Committee
        fields = ['id', 'title', 'source', 'status', 'intensity', 'notes', 'user']


class DelegateSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Delegate
        
