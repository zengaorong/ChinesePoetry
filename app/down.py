#coding=utf-8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import requests
from bs4 import BeautifulSoup
import threading
import time

from bs4 import BeautifulSoup

from manage import chapter,actor,actor1
app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['SQLALCHEMY_DATABASE_URI'] ='mysql://root:7monthdleo@120.79.217.238/chinesepoetry'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

import sys
from manage import actor,actor1
reload(sys)
sys.setdefaultencoding('utf-8')

is_over = False
page = 1
while(not is_over):
    pagination = db.session.query(actor.id,actor.actor_img,actor.actor_time,actor.actor_introduction,actor.actor_name,actor.actor_poetry_num).filter().order_by().paginate(
        page, per_page=100,
        error_out=False)
    posts = pagination.items
    if len(posts)> 0:
        for post in posts:
            soup = BeautifulSoup(post.actor_introduction.replace("\n",""),"html.parser")
            soup_data = soup.find("div",{"class":"summary"})
            out_string = ""
            for key in soup_data.contents:

                if key.name == "br":
                    out_string = out_string + "<br/>"
                else:
                    if key.string == None:
                        continue
                    out_string = out_string + key.string

            myactor1 = actor1()
            myactor1.id = int(post.id)
            myactor1.actor_name = post.actor_name
            myactor1.actor_img = post.actor_img
            myactor1.actor_time = post.actor_time
            myactor1.actor_introduction = out_string
            myactor1.actor_poetry_num = int(post.actor_poetry_num.replace("首",""))

            db.session.add(myactor1)
            db.session.commit()
        page = page +1
        print page
    else:
        is_over = True