
from django import template
from django.http import HttpResponse
from django.template.defaultfilters import stringfilter

from banksite.models import *


register=template.Library()

#,{'title':'Пагинация','url_name':'pagin'}

list_menu=[{'title':'Обувь','url_name':'magazin'}]

list_menu1={'title':['Обувь','Одежда'],
            'Обувь':['Мужчинам','Женщинам','Детская'],
            'Мужская':'magazin',
            'Одежда':['Летняя','Зимняя']}

url_name_shoes={'Мужская':'magazin'}




@register.simple_tag()
def list_menu_headers():
    return list_menu

@register.simple_tag()
def main_menu():
    return menu


@register.simple_tag()
def list_menu_1():
    return list_menu1

@register.simple_tag()
def ex():
    return reverse("reqister")

@register.simple_tag()
def left_page():
    url_page = "catalog"