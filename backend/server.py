from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Configure MongoDB connection
client = MongoClient('mongodb+srv://mtalhastar:12345@cluster0.j8ch6vo.mongodb.net/starsdb')
db = client['user_database']
collection = db['users']

# Route for handling POST requests to register a user
@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    if 'username' in data and 'password' in data:
        username = data['username']
        password = data['password']
        # Check if username already exists
        if collection.find_one({'username': username}):
            return jsonify({'message': 'Username already exists'}), 400
        # Insert user into the database
        user_id = collection.insert_one({'username': username, 'password': password}).inserted_id
        return jsonify({'message': 'User registered successfully', 'user_id': str(user_id)}), 201
    else:
        return jsonify({'message': 'Missing username or password'}), 400

if __name__ == '__main__':
    app.run(debug=True)