from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from mci_modules.models import db, User

app = Flask(__name__)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mci.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a random secret key

# initialize all extensions (database, JWT, and CORS)
CORS(app)
db.init_app(app)
jwt = JWTManager(app)

# register
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print(data)
    first_name = data.get('first_name', None)
    last_name = data.get('last_name', None)
    email = data.get('email', None)
    password = data.get('password')

    if not first_name or not last_name or not email or not password:
        return jsonify({"msg": "Missing input... please fill in all fields."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already exists"}), 409
    
    new_user = User(first_name=first_name, last_name=last_name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201

# login 
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Invalid email or password"}), 401

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    num_users = len(users)
    return jsonify({"num_users": num_users}), 200
# Other routes...

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True)