from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all', views.all, name='all'),
    path('new/feed', views.feed, name='feed'),
    path('del/feed', views.del_feed, name='del_feed'),
    path('new/bowel', views.bowel, name='bowel'),
    path('del/bowel', views.del_bowel, name='del_bowel')
]