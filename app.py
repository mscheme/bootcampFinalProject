# importing necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect
)
from db import data

####################
#   Flask Setup
####################
app = Flask(__name__)

##############################
#import SqlAlchemy#
##############################
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

######################
#   DatabaseSetup
######################
# from flask_sqlalchemy import SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgressql://postgres:postgres@aws-gt-dataviz-finalpg-001.cloqvwuqbywl.us-east-1.rds.amazonaws.com/spotify_db'
# # Remove tracking modifications
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# # insert db name here
# db = SQLAlchemy(app)


# Create route that renders index.html template

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predictor")
def predict():
    return render_template("predictor.html")


@app.route("/data")
def trackdata():
    return jsonify(data=data)

@app.route("/stats")
def stats():
    return render_template("stats.html")


if __name__ == "__main__":
    app.run()