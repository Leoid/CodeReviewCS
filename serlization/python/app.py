import pickle
import base64
from flask import Flask, request

app = Flask(__name__)

@app.route("/home",methods=["POST"])
def home():
    data_p = base64.urlsafe_b64decode(request.form['q'])
    unser = pickle.loads(data_p)
    return '',200

