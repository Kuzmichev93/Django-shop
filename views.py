from datetime import datetime, timedelta
from urllib.request import Request

from django.contrib.admin.sites import DefaultAdminSite
from django.contrib.auth import authenticate, login, logout, user_logged_out
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView
from django.contrib.sessions.backends.base import SessionBase
from django.contrib.sessions.backends.db import SessionStore
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound, HttpRequest
from django.template import RequestContext
from django.contrib import admin
from django.template.context import BaseContext, Context
from django.urls import reverse_lazy
from django.views.decorators.cache import cache_page
from translate import Translator

from Bank.pogoda import *

from banksite.models import *
from Bank.urls import *
from django.contrib.messages import get_messages, info, add_message, INFO, WARNING, ERROR
from captcha.fields import CaptchaField, CaptchaTextInput
from django import forms
from django.core.mail import send_mail
from django.core.paginator import Paginator
#from banksite.templatetags.banksite_tags import gets
# Create your views here.
lis=[{'title':'меню','url_name':'home'},{'title':'написать мне','url_name':'send_messange'},
     {'title':'Регистрация','url_name':'register'},{'title':'Войти','url_name':'voit'},
     {'title':'ОСАГО','url_name':'kov'},{'title':'Пагинация','url_name':'pagin'}]


#@cache_page(60*15)
def index(request):
    men = men_shoes.objects.all()
    wom = women_shoes.objects.all()

    if men and wom:
        return render(request,"banksite/index.html",context={'men':men,'wom':wom})

    elif men:
        return render(request,"banksite/index.html",context={'men':men})

    elif wom:
        return render(request,"banksite/index.html",context={'wom':wom})



def send_messange(request):
    if request.method == 'GET':
        context={'lis':lis,'title':'Банк'}

        return render(request,'banksite/send_messange.html',context=context)
    elif request.method == 'POST':
        print(request.POST)

        if request.POST['header'] and request.POST['email'] and request.POST['content']:
             email=request.POST['email']
             content=request.POST['content']
             send_mail(subject=request.POST['header']
                       ,message=f'Адрес Почты от {email} Сообщение: {content}'
                       ,from_email='kuzmichev19933@gmail.com',
                       recipient_list=['kuzmichev93@mail.ru'])
             context={'lis':lis,'title':'Банк'}
             return render(request,'banksite/send_messange.html',context=context)

    else:
            context={'lis':lis,'title':'Банк'}
            return render(request,'banksite/send_messange.html',context=context)


    context={'lis':lis,'title':'Банк'}
    return render(request,'banksite/send_messange.html',context=context)




class CaptchaTestForm(forms.Form):
    #myfield = AnyOtherField()
    captcha = CaptchaField()



def register(request):

    if request.method=="POST":
        user=Users()
        import requests as req
        import json
        try:
                if user.search_user(email=request.POST["email"]):
                       print(request.POST)
                       messange_error=1
                       return render(request,"banksite/index.html",context={'messange_error':messange_error
                                                                              })
        except:
            pass

        try:
           print(request.POST)
           url="https://www.google.com/recaptcha/api/siteverify"
           data = {
               'secret':"6Lfr3eAoAAAAAHCZlLnUcHxLvyQVB7Dtc3GLNukb",
               'response':request.POST['g-recaptcha-response']}

           resp=req.post(url,data)
           resp=json.loads(resp.text) #из json в словарь


           if resp["success"]and request.POST["name"]\
                   and request.POST["surname"]\
                   and request.POST["email"]\
                   and request.POST["password"]: # проверка каптчи
               print("каптча пройдена")
               request.session['error_captcha'] = 0


               if request.POST["email"]==5:
                   print(request.POST)
                   #return base(request)
                   messange_error=1
                   #render(request,"banksite/base.html",context={'messange_error':messange_error})
                   return render(request,"banksite/index.html",context={'messange_error':messange_error})

               else:

                   request.session['login']=request.POST['email']
                   request.session['password']=request.POST['password']
                   user.insert_user(first_name=request.POST["name"],
                                    last_name=request.POST["surname"],
                                    email=request.POST["email"],
                                    password=request.POST["password"])

                   user_status=authenticate(request,username=request.session['login'],
                                            password=request.session['password'])
                   login(request,user_status)
                   print(user_status)
                   response=redirect("magazin")

                   return response
               #return redirect("home")
           else:
               request.session['error_captcha'] = 1
               return redirect('magazin')

        except Exception as e:
            print(e)
    else:
        request.session['error_captcha'] = 0

    return redirect("home")

def profile(request):
    return render(request,'banksite/profile.html')

def pageNotFound(request,exception):
    return HttpResponseNotFound('Страница не найдена 404')

def login_user(request):
    response=redirect("home")
    from django.core.signing import dumps,loads
    if request.method == 'POST':
        print(request.POST)
        try:
            username=request.POST['login']
            password=request.POST['password']
            print(request.POST['login'],request.POST['password'])
            user = authenticate(request,username=username,password=password)
            print(user)
            if user:
                login(request,user)

            else:
                return response
        except Exception as e:
            print(e)

        try:
            user=Users()

            if request.POST['email']:
                from django.contrib.auth.hashers import make_password
                user_response=user.search_user(request.POST['email'])
                if user_response:
                    error_email=1
                    error_password=0
                    try:
                        if authenticate(request,username=request.POST['email'],password=request.POST['password']):
                            error_password=1
                            request.session['login']=request.POST['email']
                            request.session['password']=request.POST['password']
                            return render(request,'banksite/login.html',
                                          context={"error_email":error_email,
                                                   "error_password":error_password})
                        #print(user_response[0].password)
                    except:
                        pass
                    return render(request,'banksite/login.html',
                                  context={"error_email":error_email,
                                           "error_password":error_password})
                else:
                    error_email=0
                    return render(request,'banksite/login.html',
                                  context={"error_email":error_email})
        except Exception as e:
            print(e)
            return response

    else:

        return response


def basket(request):

    try:
        #print(request.session['pay'])
        if request.method == "GET":
            Array=request.session['pay']
            Array_res=[0]*len(Array)
            i=0
            for k in Array:
                Array_res[i]=k
                i+=1

            men_product = men_shoes.objects.filter(id__in=Array_res)

            wom_product = women_shoes.objects.filter(id__in=Array_res)
            men = men_product
            wom = wom_product
            price=0
            print(request.session['pay'])
            if men_product and wom_product:
                for z in men:
                    price+=int(z.price)
                for i in wom:
                    price+=int(i.price)
                return  render(request,'banksite/basket.html',context={'men':men,'wom':wom,'price':price})
            elif men_product:
                for z in men:
                    price+=int(z.price)
                return  render(request,'banksite/basket.html',context={'men':men,'price':price})
            elif wom_product:
                for i in wom:
                    price+=int(i.price)
                return  render(request,'banksite/basket.html',context={'wom':wom,'price':price})

        elif request.method == 'POST':
            """установление чек бокс и нет"""
            print(request.POST['click'])
            print(request.session['pay'])
            request.session['pay'][request.POST['id']][2]=request.POST['click']
            print(request.session['pay'])

            sessions=request.session['pay']
            return render(request,'banksite/basket.html',context={'checked':'checked','sessions':sessions})
    except:
        return render(request,'banksite/basket.html')

def logout_user(request):
    try:
        login = request.session['login']
        password = request.session['password']
    except  Exception as e:
        print(e)
    try:
        if 'search' and 'pay' not in request.session:
            logout(request)
            request.session['login']=login
            request.session['password']=password
    except  Exception as e:
       print(e)
    try:
       if 'search' and 'pay' in request.session:
           search = request.session['search']
           pay = request.session['pay']
           logout(request)
           request.session['search'] = search
           request.session['pay'] = pay
           request.session['login']=login
           request.session['password']=password
    except Exception as e:
        print(e)
    try:

       if 'search' and not 'pay' in request.session:
             search = request.session['search']
             logout(request)
             request.session['search'] = search
             request.session['login']=login
             request.session['password']=password
    except Exception as e:
        print(e)
    try:

       if 'pay' and not 'search' in request.session:
           pay = request.session['pay']
           logout(request)
           request.session['pay'] = pay
           request.session['login']=login
           request.session['password']=password
    except Exception as e:
        print(e)
    return redirect("home")





def pagin(request,post_slug):
    list=['Россия','США','Великобритания','Германия']
    paginat=Paginator(list,2)
    page_number=request.GET.get('page')
    print(page_number)
    page_obj=paginat.get_page(page_number)
    print(page_obj.paginator.page_range)


    try:
       m=POSTS.objects.filter(slug=post_slug)

       return render(request,'banksite/pagin.html',{'m':m[0].title})
    except:
        return HttpResponseNotFound('Слаг не найден')
    #return render(request,'banksite/pagin.html',context={'page_obj':page_obj})




def set_session(request,id=None):
    """запись в сессионку товаров"""
    res=redirect('home')
    if request.method == "POST":
        men_product = men_shoes.objects.filter(pk=request.POST['id'])
        women_product = women_shoes.objects.filter(pk=request.POST['id'])
        if men_product:
             m = men_product
        else:
             m = women_product


        try:

            if request.session['pay']:
                try:
                    if request.session['pay'][request.POST['id']]:
                        return res
                except:
                    request.session['pay'][str(m[0].id)]=(int(m[0].id),f'{m[0].title}',1)
                    print(request.session['pay'])
                    ses=request.session['pay']
                    print(len(ses))
                    request.session['len_session']=0
                    request.session['len_session']=len(ses)
            else:
                print('ошибка сессии')

        except:

            request.session['pay']={}
            request.session['pay'][str(m[0].id)]=(int(m[0].id),f'{m[0].title}',1)
            ses=request.session['pay']
            print(len(ses))
            request.session['len_session']=0
            request.session['len_session']=len(ses)

        return res
    else:
        return res

def address(request):


    return render(request,'banksite/address.html')



def search(request):
    if request.method=="GET":
        try:
           value_search=request.session["search"]

           if len(value_search)!=5:
              request.session["search"][request.GET["search"]]=request.GET["search"]
              #return render(request,'banksite/search.html',context={"value_search":value_search})
           else:
              for k in value_search:
                 request.session["search"].pop(k,k)
                 request.session["search"][request.GET["search"]]=request.GET["search"]
                 break

        except:
            request.session["search"]={}
            request.session["search"][request.GET["search"]]=request.GET["search"]

        try:
            if len(request.GET["search"])>0:
                 key=request.GET["search"]

                 men = men_shoes.objects.raw(f"""SELECT * FROM banksite_men_shoes WHERE title LIKE '%{key.title()}%'
                                           or title LIKE '%{key}%' """)
                 wom = women_shoes.objects.raw(f"""SELECT * FROM banksite_women_shoes WHERE title LIKE '%{key.title()}%'
                                           or title LIKE '%{key}%' """)
                 if men and wom:
                     return render(request,'banksite/search.html',context={"men":men,"wom":wom})
                 elif men:
                     return render(request,'banksite/search.html',context={"men":men})
                 elif wom:
                     return render(request,'banksite/search.html',context={"wom":wom})

        except Exception as e:
            print(e)
    else:
        try:
            print(request.POST['del_key'])
            request.session['search'].pop(request.POST['del_key'],request.POST['del_key'])
        except:
            pass
    return render(request,'banksite/search.html')


def catalog(request,type=None,sex=None):
    if type and not sex:
        men_obuv = men_shoes.objects.filter(slug_group=type)
        wom_obuv = women_shoes.objects.filter(slug_group=type)
        if men_obuv and wom_obuv:
            men = men_obuv
            wom = wom_obuv
            return render(request,'banksite/catalog.html',context={"men":men,"wom":wom})

        elif men_obuv:
            return render(request,'banksite/catalog.html',context={"men_obuv":men_obuv})
        elif wom_obuv:
            return render(request,'banksite/catalog.html',context={"wom_obuv":wom_obuv})

    elif type and sex:
        men_obuv = men_shoes.objects.filter(slug_group=type,slug_sex=sex)
        wom_obuv = women_shoes.objects.filter(slug_group=type,slug_sex=sex)
        if men_obuv:
            return render(request,'banksite/catalog.html',context={"men_obuv":men_obuv})
        elif wom_obuv:
            return render(request,'banksite/catalog.html',context={"wom_obuv":wom_obuv})
        else:
            return redirect("home")
    else:
        return redirect("home")





