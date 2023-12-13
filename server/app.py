from flask import Flask
from flask_cors import CORS
from mci_modules.views import views


app = Flask(__name__)
CORS(app)

app.register_blueprint(views, url_prefix='/')

@app.route('/')
def index():
    return "Hello from Flask!"

if __name__ == '__main__':
    app.run(debug=True)