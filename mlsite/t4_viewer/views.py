from django.shortcuts import render
from django.template.response import TemplateResponse
import json
import os

# Create your views here.

def index(request):
    print(os.getcwd())
    with open('t4_viewer/boa_tree.json','r') as fo:
        context = json.load(fo)

    return render(request,'t4_viewer/index.html',context)


