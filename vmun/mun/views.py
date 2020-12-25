import json
import datetime

from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Conference, Committee, Delegate
from .serializers import ConferenceSerializer, CommitteeSerializer, DelegateSerializer

from accounts.models import User


class ListAPIView(generics.ListCreateAPIView):
    def delete(self, request, id=None, format=None):
        obj = self.get_objects()
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ConferenceListView(ListAPIView):
    queryset = Conference.objects.all()
    serializer_class = ConferenceSerializer

    def get_objects(self):
        return Conference.objects.all()


# class MyConferenceListView(ListAPIView)


class CommitteeListView(ListAPIView):
    queryset = Committee.objects.all()
    serializer_class = CommitteeSerializer

    def get_objects(self):
        return Committee.objects.all()


class DelegateListView(ListAPIView):
    queryset = Delegate.objects.all()
    serializer_class = DelegateSerializer

    def get_objects(self):
        return Delegate.objects.all()


# TODO fix error handlings e.g. 404
class DetailAPIView(APIView):
    def delete(self, request, id=None, format=None):
        obj = self.get_object(id)
        obj.delete()
        return Response({'id': id})


class ConferenceAPIView(ListAPIView):
    serializer_class = ConferenceSerializer

    def get_object(self, slug):
        return Conference.objects.get(slug=slug)

    def get(self, request, slug, format=None):
        conf = self.get_object(slug)
        serializer = ConferenceSerializer(conf)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        conf = self.get_object(slug)
        serializer = ConferenceSerializer(conf, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class CommitteeAPIView(ListAPIView):
    serializer_class = CommitteeSerializer

    def get_object(self, slug):
        return Committee.objects.get(slug=slug)

    def get(self, request, slug, format=None):
        comt = self.get_object(slug)
        serializer = CommitteeSerializer(comt)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        comt = self.get_object(slug)
        serializer = CommitteeSerializer(comt, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)



class DelegateAPIView(ListAPIView):
    serializer_class = DelegateSerializer

    def get_object(self, slug):
        return Delegate.objects.get(slug=slug)

    def get(self, request, slug, format=None):
        delg = self.get_object(slug)
        serializer = DelegateSerializer(delg)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        delg = self.get_object(slug)
        serializer = DelegateSerializer(delg, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


# lambda this
def get_user_id(request):
    if request.user and request.user.is_anonymous == False:
        return request.user.id
    return os.environ.get('TESTUSER_ID') or None  # take care of edge case later


@ensure_csrf_cookie
def add_conference(request):
    if request.is_ajax():
        # exceptions later
        post_data = json.load(request)
        title = post_data['title']

        # update fields using **kwargs
        user = request.user
        # fix the date later (from form)
        conf = Conference.objects.create(title=title, date_start='2020-06-10', date_end='2020-06-10', creator=user)
        conf.participants.add(user)

        # prolly return entire object? depends smh
        conf_json = ConferenceSerializer(instance=conf).data
        return JsonResponse({'conference': conf_json})

    return JsonResponse({'conference': None})
