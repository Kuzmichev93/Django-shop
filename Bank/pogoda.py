import requests as rg
from bs4 import BeautifulSoup as bs
import unidecode as un
import django
django.setup()
def pogoda(city=None):
    try:

        city=un.unidecode(city)
        url=f'https://pogoda.mail.ru/prognoz/{city}/'
        reg=rg.get(url=url)
        soap=bs(reg.text,'html.parser')
        city=soap.select('h1.information__header__left__place__city')[0].text
        t=soap.select('div.information__header__left__date')[0].text
        c=soap.select('div.information__content__temperature')[0].text
        dav=soap.select('div.information__content__additional__item')[4].text
        vl=soap.select('div.information__content__additional__item')[5].text
        v=soap.select('div.information__content__additional__item')[6].text
        sl={'city':city,'t':t.strip(),'c':c.strip(),'dav':dav.strip(),'vl':vl.strip()[:3],'v':v.split()[0]+' м/с'}

    except:
        print('Введите правильное значение города')
        return 0
    return sl