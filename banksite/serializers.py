from django.contrib.auth.models import User
from rest_framework.response import Response
import json




class UserSerialize:
    error_arry = {}
    def __init__(self,list,model,id=None):
        self.list=list
        self.model=model
        self.id=id


    def is_valid(self):
        self.arry=['first_name','last_name','email','password']
        self.flag = 1
        for k in self.arry:
            try:
                if self.list[k]:
                    print(self.list[k])
                    if self.list[k] == ' ':
                        self.error_arry[k]='Поле содержит пустое значение'
                        self.flag = 0
            except:
                self.flag = 0
                self.error_arry[k] = 'Укажите данное поле в теле запроса'
        self.flag_update = 0
        if self.flag and self.id:
            user = self.model.objects.filter(pk=self.id)
            if user:
                self.flag_update = 1
            else:
                self.flag_update = 0


    def data(self):
        if self.flag and not self.flag_update:
            return {'Пользователь зарегистрирован':{'id':self.user.id,
                                                    'email':self.user.email,
                                                    'password':self.user.password}}
        elif self.flag and self.flag_update:
            user = User.objects.get(pk=self.id)
            return {'Пользователь обновлен':{'id': user.id,
                                            'fisrt_name':user.first_name,
                                             'last_name':user.last_name,
                                             'email':user.email,
                                             'password':user.password}}
        else:
            return self.error_arry
    def create(self):
        if self.flag:
            self.user = self.model.objects.create(username=self.list['email'],**self.list)

            return 1
        else:
            return 0

    def update(self):

        if self.flag_update:
            user = self.model.objects.get(id=self.id)
            user.username = self.list['email']
            user.first_name = self.list['first_name']
            user.last_name = self.list['last_name']
            user.email = self.list['email']
            user.password = self.list['password']
            user.save()

    def save(self):
        if self.flag and  not self.flag_update:
            self.create()
        elif self.flag and self.flag_update:
            self.update()



