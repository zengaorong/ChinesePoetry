#coding=utf-8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['SQLALCHEMY_DATABASE_URI'] ='mysql://root:7monthdleo@120.79.217.238/chinesepoetry'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class actor(db.Model):
    __tablename__ = 'actor'
    id = db.Column(db.VARCHAR(36), primary_key=True)
    actor_name = db.Column(db.VARCHAR(36))
    actor_img = db.Column(db.VARCHAR(255))
    actor_time = db.Column(db.VARCHAR(5))
    actor_introduction = db.Column(db.Text())
    actor_poetry_num = db.Column(db.VARCHAR(10))


    def __repr__(self):
        return '<actor %r>' % self.actor_name

class actor1(db.Model):
    __tablename__ = 'actor1'
    id = db.Column(db.Integer, primary_key=True)
    actor_name = db.Column(db.VARCHAR(36))
    actor_img = db.Column(db.VARCHAR(255))
    actor_time = db.Column(db.VARCHAR(5))
    actor_introduction = db.Column(db.Text())
    actor_poetry_num = db.Column(db.Integer)


    def __repr__(self):
        return '<actor %r>' % self.actor_name

class chapter(db.Model):
    __tablename__ = 'chapter'
    chapter_id = db.Column(db.VARCHAR(10), primary_key=True)
    actor_id = db.Column(db.VARCHAR(10), db.ForeignKey('actor.id'))
    chapter_img = db.Column(db.String(128))
    chapter_shici_title = db.Column(db.String(64))
    chapter_shici_info = db.Column(db.String(128))
    chapter_shici_mark = db.Column(db.String(128))
    chapter_shici_content = db.Column(db.Text())
    chapter_shangxi_container = db.Column(db.Text())


    def __repr__(self):
        return '<chapter %r>' % self.chapter_shici_title


db.create_all()
db.session.commit()








