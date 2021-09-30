from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all', views.all, name='all'),
    path('new/feed', views.feed, name='feed'),
    path('new/bowel', views.bowel, name='bowel')
]