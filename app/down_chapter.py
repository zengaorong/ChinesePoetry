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
from manage import chapter,actor
reload(sys)
sys.setdefaultencoding('utf-8')




session_actor = requests.session()

def __spider_chapter(chapter_num,actor_id):
    url = "http://www.shicimingju.com/chaxun/list/%s.html"%str(chapter_num)
    respons = session_actor.get(url)
    soup = BeautifulSoup(respons.text,"html.parser")
    chapter_data = soup.find("div",{"class":"shici-container www-shadow-card"})
    if chapter_data.find("img")!=None:
        chapter_img = chapter_data.find("img")['src']
    else:
        chapter_img = ""
    chapter_shici_title = chapter_data.find("h1",{"class":"shici-title"})
    chapter_shici_info = chapter_data.find("div",{"class":"shici-info"})
    chapter_shici_content = chapter_data.find("div",{"class":"shici-content"})
    chapter_shici_mark = chapter_data.find("div",{"class":"shici-mark"})
    chapter_shangxi_container = chapter_data.find("div",{"class":"shangxi-container"})
    chapter_id = chapter_num
    actor_id = actor_id

    mychaper = chapter()
    mychaper.chapter_id = chapter_id
    mychaper.actor_id = actor_id
    mychaper.chapter_shici_title = chapter_shici_title.string
    mychaper.chapter_shici_info = chapter_shici_info.contents[0] + chapter_shici_info.contents[1].string
    mychaper.chapter_shici_content = chapter_shici_content
    if chapter_shici_mark != None:
        mark_list = chapter_shici_mark.find_all("a")
        mark_string = ""
        for key in mark_list:
            if key != None:
                mark_string = mark_string + key.string + ","
        chapter_shici_mark = mark_string.strip(",")
    else:
        chapter_shici_mark = ""
    mychaper.chapter_shici_mark = chapter_shici_mark
    mychaper.chapter_shangxi_container = chapter_shangxi_container
    mychaper.chapter_img = chapter_img
    db.session.add(mychaper)
    db.session.commit()

if __name__ == "__main__":
    actor_list = db.session.query(actor.id,actor.actor_name).filter()
    for key in actor_list:
        print key[1]
        actor_id = key[0]
        nums = 1
        work_over = False
        while(not work_over):
            url = "http://www.shicimingju.com/chaxun/zuozhe/%s_%s.html"%(actor_id,str(nums))
            respons = session_actor.get(url)
            soup = BeautifulSoup(respons.text,"html.parser")
            down_lists = soup.find_all("h3")
            chapter_num_list = []
            if down_lists!=[]:
                nums = nums + 1
                for key in down_lists:
                    chapter_num_list.append(key.find('a')['href'].split('/')[-1].replace(".html",""))

                download_threads = []
                check_num = 20
                for num in chapter_num_list:
                    if len(threading.enumerate()) >= 20:
                        time.sleep(0.5 + len(threading.enumerate())*0.1)
                    download_thread = threading.Thread(target=__spider_chapter,args=(num,actor_id))
                    download_threads.append(download_thread)
                    download_thread.start()

                [t.join() for t in download_threads]
            else:
                work_over = True






    # download_threads = []
    # check_num = 5
    # for num in range(1,13033+1):
    #     if len(threading.enumerate()) >= 5:
    #         time.sleep(0.5 + len(threading.enumerate())*0.1)
    #     download_thread = threading.Thread(target=__spider_actor(num))
    #     download_threads.append(download_thread)
    #     download_thread.start()
    #
    # [t.join() for t in download_threads]



