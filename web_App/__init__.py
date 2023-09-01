from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
db = SQLAlchemy()
app.config['SECRET_KEY'] = 'fwejkej2jknksnrk5fem'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///crud_project.db"
db.init_app(app)

with app.app_context():
    db.create_all()

from web_App import route