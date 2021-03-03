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

@app.route("/4nerdz")
def info():
    return render_template("4nerdz.html")

if __name__ == "__main__":
    app.run()