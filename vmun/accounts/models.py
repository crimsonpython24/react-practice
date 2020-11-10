from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.text import slugify

from phonenumber_field.modelfields import PhoneNumberField

from .model_choices import website_choices, gender_choices, nickname_choices


class Place(models.Model):
    country = models.CharField(_('city'), max_length=100)
    city = models.CharField(_('city'), max_length=100, blank=True)
    current = models.BooleanField(_('current_residence'), default=False)
    publicity = models.BooleanField(_('publicity'), default=False)

    def __str__(self):
        return (self.city + ', ' + self.country)[:50]


class Link(models.Model):
    name = models.CharField(_('name'), max_length=10, choices=website_choices)
    url = models.URLField(_('url'))
    publicity = models.BooleanField(_('publicity'), default=False)

    def __str__(self):
        return self.url


class Education(models.Model):
    name = models.CharField(_('school_name'), max_length=150)
    degree = models.CharField(_('degree'), max_length=150)
    start = models.IntegerField(_('start year'))
    end = models.IntegerField(_('end year'), blank=True)
    description = models.TextField(_('description'), max_length=500, blank=True)
    publicity = models.BooleanField(_('publicity'), default=False)

    def __str__(self):
        return (self.name + ': ' + self.major)[:50]


class Work(models.Model):
    organization = models.CharField(_('organization'), max_length=150)
    title = models.CharField(_('title'), max_length=150)
    start = models.IntegerField(_('start year'))
    end = models.IntegerField(_('end year'), blank=True)
    description = models.TextField(_('description'), max_length=500, blank=True)
    publicity = models.BooleanField(_('publicity'), default=False)

    def __str__(self):
        return (self.organization + ': ' + self.title)[:50]


# The account model is modeled after Google's user model
# Visit https://www.accounts.google.com for original implementation
class User(AbstractUser):
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    slug = models.SlugField(unique=True)
    first_name = models.CharField(_('first name'), max_length=150, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    nickname = models.CharField(_('nickname'), max_length=50, blank=True)
    nickname_display = models.CharField(_('nickname_display'), max_length=1000, choices=nickname_choices, blank=True)
    avatar = models.ImageField(_('avatar'), blank=True, null=True)
    gender = models.CharField(_('gender'), max_length=10, choices=gender_choices, blank=True, null=True)
    birthday = models.DateField(_('birthday'), blank=True, null=True)
    email = models.EmailField(_('email address'), unique=True)
    phone = PhoneNumberField(_('phone number'), blank=True)
    places = models.ManyToManyField(Place, blank=True)
    links = models.ManyToManyField(Link, blank=True)
    introduction = models.TextField(_('introduction'), max_length=500, blank=True, null=True)
    education = models.ManyToManyField(Education, blank=True)
    work = models.ManyToManyField(Work, blank=True)
    nickname_vis = models.BooleanField(_('nickname visibility'), default=False, blank=True)
    gender_vis = models.BooleanField(_('gender visibility'), default=False, blank=True)
    birthday_vis = models.BooleanField(_('birthday visibility'), default=False, blank=True)
    email_vis = models.BooleanField(_('email visibility'), default=False, blank=True)
    phone_vis = models.BooleanField(_('phone visibility'), default=False, blank=True)
    intro_vis = models.BooleanField(_('introduction visibility'), default=False, blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.username, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
