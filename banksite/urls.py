from django.contrib.admin.sites import DefaultAdminSite
from django.urls import path
from django.contrib.admin import site
from banksite.admin import *

from .views import *
urlpatterns = [

    path('',index, name = 'home'),
    #path('send_messange/',send_messange,name='send_messange'),
    path('register/',register,name='register'),
    #path('login/',LoginUser.as_view(),name=
    path('login/',login_user,name='login_user'),
    path('logout/',logout_user,name='logout_user'),
    path('pagin/<slug:post_slug>/',pagin,name='pagin'),
    path('basket/',basket,name='basket'),
    path('set_session/',set_session,name='set_session'),
    path('address/',address,name='address'),
    #path('',magazin,name='magazin'),
    path('search/',search,name='search'),
    path('catalog/<slug:type>/',catalog,name='catalog'),
    path('catalog/<slug:type>/<slug:sex>/',catalog,name='catalog'),
    path('catalog/',catalog),
    path('profile/',profile,name='profile')



]


