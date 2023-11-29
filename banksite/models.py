from django.contrib.auth import login
from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse
from django.core.signing import dumps,loads


class list_product(models.Model):
    class Meta:
        verbose_name = 'Список товаров'
        verbose_name_plural='Список товаров'
    id = models.IntegerField(primary_key=True)
    title_list = models.TextField(max_length=100,verbose_name='Название основного товара')


    def __str__(self):
        return self.title_list


class sex(models.Model):
    class Meta:
        verbose_name = 'Пол'
        verbose_name_plural='Пол'
    id = models.IntegerField(primary_key=True)
    title_sex = models.TextField(max_length=250,verbose_name='Пол')
    #title_list_id = models.ForeignKey('list_product',on_delete=models.CASCADE,
    #                              to_field='title_list')
    title_list_id = models.ForeignKey('list_product',on_delete=models.CASCADE,
                                  to_field='id')
    def __str__(self):
        return self.title_sex

class men_shoes(models.Model):

    class Meta:
        verbose_name = 'Мужская обувь'
        verbose_name_plural='Мужская обувь'
    title=models.TextField(max_length=250,verbose_name='Название обуви')
    price=models.IntegerField(verbose_name='Цена товара')
    image=models.ImageField(upload_to="photos/%Y/%m/%d/",verbose_name='Фото товара')
    #product_group = models.ForeignKey('list_product',on_delete=models.CASCADE,
    #                                  to_field='title_list',verbose_name="Группа товара",null=True)
    product_group = models.ForeignKey('list_product',on_delete=models.CASCADE,
                                       to_field='id',verbose_name="Группа товара",null=True)


    #sex_id = models.ForeignKey('sex',on_delete=models.CASCADE,
    #                        to_field='title_sex',verbose_name="Пол",null=True)

    sex_id = models.ForeignKey('sex',on_delete=models.CASCADE,
                                to_field='id',verbose_name="Пол",null=True)

    product_type = models.CharField(max_length=250,verbose_name='Тип обуви',null=True)
    slug_group = models.SlugField(max_length=255,db_index=True,verbose_name="Url товара",null=True)
    slug_sex = models.SlugField(max_length=255,db_index=True,verbose_name="Url пол",null=True)
    def __str__(self):
        return self.title

class women_shoes(models.Model):

    class Meta:
        verbose_name = 'Женская обувь'
        verbose_name_plural='Женская обувь'
    title=models.TextField(max_length=250,verbose_name='Название обуви')
    price=models.IntegerField(verbose_name='Цена товара')
    image=models.ImageField(upload_to="photos/%Y/%m/%d/",verbose_name='Фото обуви')
    product_group = models.ForeignKey('list_product',on_delete=models.CASCADE,
                                      to_field='id',verbose_name="Группа товара",null=True)

    #product_group = models.ForeignKey('list_product',on_delete=models.CASCADE,
    #                                  to_field='title_list',verbose_name="Группа товара",null=True)
    #sex_id = models.ForeignKey('sex',on_delete=models.CASCADE,
    #                        to_field='title_sex',verbose_name="Пол",null=True)

    sex_id = models.ForeignKey('sex',on_delete=models.CASCADE,
                               to_field='id',verbose_name="Пол",null=True)

    product_type = models.CharField(max_length=250,verbose_name='Тип обуви',null=True)
    slug_group = models.SlugField(max_length=255,db_index=True,verbose_name="Url товара",null=True)
    slug_sex = models.SlugField(max_length=255,db_index=True,verbose_name="Url пол",null=True)



    def __str__(self):
        return self.title




class Users:

    def insert_user(self,first_name,last_name,email,password):
        us=User()
        us.username=email
        us.first_name=first_name
        us.last_name=last_name
        us.email=email
        us.set_password(password)
        us.save()

    def search_user(self,email):
        if email:
            return User.objects.filter(email=email)
        else:
            return 0

