from django.urls import path, include


from . import views

urlpatterns = [
    path('datatree', views.datatree),
    path('terms', views.terms),
    path('', views.index),
]

