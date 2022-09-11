from django.urls import path, include
from . import views

urlpatterns = [
    path('datatree', views.datatree),
    path('data_viewer', views.data_viewer),
    path('terms', views.terms),
    path('', views.index),
]

