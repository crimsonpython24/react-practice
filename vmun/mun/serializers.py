from rest_framework import serializers
from .models import Conference, Committee, Delegate


class ConferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conference
        fields = ['id', 'slug', 'title', 'date_start', 'date_end']


class CommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Committee
        fields = ['id', 'slug', 'conference', 'chair', 'title']


class DelegateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Delegate
        fields = ['id', 'slug', 'committee', 'user', 'nation']
