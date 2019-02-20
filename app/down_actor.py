#coding=utf-8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import requests
from bs4 import BeautifulSoup
import threading
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['SQLALCHEMY_DATABASE_URI'] ='mysql://root:7monthdleo@120.79.217.238/chinesepoetry'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

import sys
from manage import actor
reload(sys)
sys.setdefaultencoding('utf-8')




session_actor = requests.session()

def __spider_actor(nums):
    url = "http://www.shicimingju.com/chaxun/zuozhe/%s.html"%str(nums)
    respons = session_actor.get(url)
    soup = BeautifulSoup(respons.text,"html.parser")

    actor_production = soup.find("div",{"class":"zuozhe-header www-shadow-card"})
    if actor_production == None:
        return



    actor_name = actor_production.find("h2").contents[0].string
    actor_id = actor_production.find("h2").contents[0]['href'].split('/')[-1].replace(".html","")
    actor_time = actor_production.find_all("span",{"class":"sub-inline-title"})[0].next_sibling
    actor_poetry_num = actor_production.find_all("span",{"class":"sub-inline-title"})[1].next_sibling
    actor_introduction = actor_production.find("div",{"class":"summary"})
    if actor_production.find("div",{"class":"summary"}).find("img") == None:
        actor_img = ""
    else:
        actor_img = actor_production.find("div",{"class":"summary"}).find("img")["src"]

    myactor = actor()
    myactor.id = actor_id
    myactor.actor_name = actor_name
    myactor.actor_img = actor_img
    myactor.actor_time = actor_time
    myactor.actor_introduction = actor_introduction
    myactor.actor_poetry_num = actor_poetry_num

    db.session.add(myactor)
    db.session.commit()
    print actor_name


if __name__ == "__main__":
    download_threads = []
    check_num = 5
    for num in range(1,13033+1):
        if len(threading.enumerate()) >= 5:
            time.sleep(0.5 + len(threading.enumerate())*0.1)
        download_thread = threading.Thread(target=__spider_actor(num))
        download_threads.append(download_thread)
        download_thread.start()

    [t.join() for t in download_threads]



