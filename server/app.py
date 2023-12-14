from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token
from passlib.hash import pbkdf2_sha256 as sha256
from flask_cors import CORS

app = Flask(__name__)

# configure JWT secret key
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a random secret key
jwt = JWTManager(app)

# enable CORS
CORS(app)

# testing without a database first
users = {
    "user2@gmail.com": sha256.hash("password2")
}

# register
@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    if username in users:
        return jsonify({"msg": "Username already exists"}), 409

    users[username] = sha256.hash(password)
    return jsonify({"msg": "User created"}), 201

# login 
@app.route('/login', methods=['POST'])
def login():
    # print(request.json) # just to test if things work
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user_pass = users.get(email, None)
    if user_pass and sha256.verify(password, user_pass):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401

# Other routes...

if __name__ == '__main__':
    app.run(debug=True)
