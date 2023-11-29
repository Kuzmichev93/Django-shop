from django.contrib import admin
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.urls import path

from banksite.models import *
from django.contrib.admin.sites import DefaultAdminSite
# Register your models here.



class Men_shoesAdmin(admin.ModelAdmin):
    list_display =['pk','title','price','image',"product_group","product_type","sex_id","slug_group","slug_sex"]
    list_display_links = ['pk','title','price','image',"product_group","product_type","slug_group","slug_sex"]
   # prepopulated_fields = {"slug_group":("product_group",),"slug_sex":("sex_id",)}
admin.site.register(men_shoes,Men_shoesAdmin)

class Women_shoesAdmin(admin.ModelAdmin):
    list_display =['title','price','image',"product_group","product_type","sex_id","slug_group","slug_sex"]
    list_display_links = ['title','price','image',"product_group","product_type","slug_group","slug_sex"]
    #prepopulated_fields = {"slug_group":("product_group",),"slug_sex":("sex_id",)}
admin.site.register(women_shoes,Women_shoesAdmin)



#admin_site = MyAdmin(name='log')
#admin_site.register(Bankuser)
