#coding=utf-8
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app
from flask_login import UserMixin,AnonymousUserMixin
from . import db
from datetime import datetime



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


# db.create_all()
# db.session.commit()








