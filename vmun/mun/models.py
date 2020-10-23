from django.db import models

from accounts.models import User


class Conference(models.Model):
    title = models.CharField(max_length=200, blank=False, unique=True)
    date_start = models.DateField(blank=False, auto_now_add=False)
    date_end = models.DateField(blank=False, auto_now_add=False)

    def __str__(self):
        return self.title


class Committee(models.Model):
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE)
    chair = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=False)

    def __str__(self):
        return '{} ({})'.format(self.title, self.conference.title)


class Delegate(models.Model):
    committee = models.ForeignKey(Committee, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nation = models.CharField(max_length=100)

    def __str__(self):
        return '{} ({}, {})'.format(self.user.username, self.committee.title, self.committee.conference.title)
