#coding=utf-8
from flask import render_template, request, \
    current_app,jsonify,session
from . import poetry
import sys
import platform
from ..models import chapter,actor,actor1
from .. import db
from bs4 import BeautifulSoup

reload(sys)
sys.setdefaultencoding('utf-8')

@poetry.route('/actor', methods=['GET', 'POST'])
def actor_page():
    if request.method == 'POST':
        data_put = request.form.get('data_put', "", type=str)
        session["data_put"] = data_put
        return render_template("poetry/test.html")

    page = request.args.get('page', 1, type=int)

    select_time = session.get("data_put","")
    param = []
    if select_time!="全部" and select_time!="" and select_time!=None:
        param.append(actor1.actor_time == select_time)

    pagination = db.session.query(actor1.id,actor1.actor_img,actor1.actor_time,actor1.actor_introduction,actor1.actor_name).filter(*param).order_by().paginate(
        page, per_page=current_app.config['FLASKY_POSTS_PER_PAGE'],
        error_out=False)
    posts = pagination.items
    posts = pagination.items
    listsize = pagination.total
    return render_template("poetry/actor.html",posts=posts,pagination=pagination,listsize=listsize,data_put=session.get("data_put","全部"))

@poetry.route('/actorlist/<actor_id>', methods=['GET', 'POST'])
def actorlist(actor_id):
    page = request.args.get('page', 1, type=int)
    pagination = db.session.query(chapter.chapter_id,chapter.chapter_shici_title,chapter.chapter_shici_content).filter(chapter.actor_id==actor_id).order_by().paginate(
        page, per_page=current_app.config['FLASKY_POSTS_PER_PAGE'],
        error_out=False)
    posts = pagination.items

    chapter_list = []
    for key in posts:
        myachapter = chapter()
        myachapter.chapter_id = key.chapter_id
        myachapter.chapter_shici_title = key.chapter_shici_title
        myachapter.chapter_shici_content = key.chapter_shici_content


        soup = BeautifulSoup(myachapter.chapter_shici_content.replace("\n",""),"html.parser")
        soup_data = soup.find("div",{"class":"shici-content"})
        out_string = ""
        for key in soup_data.contents:

            if key.name == "br":
                pass
            else:
                if key.string == None:
                    continue
                out_string = out_string + key.string

        print out_string
        myachapter.chapter_shici_content = out_string
        chapter_list.append(myachapter)


    listsize = pagination.total

    actors = actor1.query.filter_by(id=int(actor_id)).first()

    return render_template("poetry/actorlist.html",posts=chapter_list,actors=actors,pagination=pagination,listsize=listsize,actor_id=actor_id)


@poetry.route('/chaptershow/<chapter_id>', methods=['GET', 'POST'])
def chaptershow(chapter_id):
    # 25739
    chapter_data = chapter.query.filter_by(chapter_id=chapter_id).first()
    actors = actor1.query.filter_by(id=int(chapter_data.actor_id)).first()
    return render_template("poetry/chaptershow.html",chapter_data=chapter_data,actors=actors)