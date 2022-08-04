from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    imageBanner = models.ImageField(null=True, blank=True)
    authorName = models.CharField(max_length=200, null=True, blank=True)
    authorThumbnail = models.ImageField(null=True, blank=True)
    tags = models.CharField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=255,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id =  models.AutoField(primary_key=True, editable=False)


class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    imageBanner = models.ImageField(null=True, blank=True)
    title = models.CharField(max_length=255,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id =  models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name    