from django.db import models
from django.utils.text import slugify

from accounts.models import User


class Conference(models.Model):
    slug = models.SlugField(unique=True, blank=True)
    title = models.CharField(max_length=200, blank=False, unique=True)
    date_start = models.DateField(blank=False, auto_now_add=False)
    date_end = models.DateField(blank=False, auto_now_add=False)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Committee(models.Model):
    slug = models.SlugField(unique=True, blank=True)
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE)
    chair = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=False)

    def save(self, *args, **kwargs):
        self.slug = slugify(
            '{}_{}'.format(self.conference.title, self.title), allow_unicode=True
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return '{} ({})'.format(self.title, self.conference.title)


class Delegate(models.Model):
    slug = models.SlugField(unique=True, blank=True)
    committee = models.ForeignKey(Committee, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nation = models.CharField(max_length=100)
    
    def save(self, *args, **kwargs):
        self.slug = slugify(
            '{}_{}_{}'.format(
                self.committee.conference.title, self.user.username, self.committee.title),
                allow_unicode=True
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return '{} ({}, {})'.format(
                    self.user.username, self.committee.title, self.committee.conference.title
                )
