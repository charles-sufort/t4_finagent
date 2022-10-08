from django.shortcuts import render
from django.template.response import TemplateResponse
import json
import os

# Create your views here.

def datatree(request):
    print(os.getcwd())
    with open('t4_viewer/boa_tree.json','r') as fo:
        context = json.load(fo)
    return render(request,'t4_viewer/datatree.html',context)

def data_viewer(request):
    context = {}
    return render(request, 't4_viewer/data_viewer.html', context)


def terms(request):
    context = {}
    return render(request,'t4_viewer/terms.html', context)

def tests(request):
    context = {}
    return render(request,'t4_viewer/tests.html', context)

def index(request):
    context = {}
    return render(request,'t4_viewer/index.html', context)


