from web_App import app,db
from flask import render_template,request,jsonify
from web_App.db_Table import User
from datetime import datetime


#base_url = "http://127.0.0.1:5000"
@app.route('/')
@app.route('/register', methods=['POST','GET'])
def register():
    if request.method == 'POST':
        data = request.json
        username = data['username']
        email = data['email']
        password_hash = data['password']
        confirm_password = data['password_match']
        current_time = datetime.now()
        if password_hash != confirm_password:
            return jsonify({'message':'Password Not match !'})
        
        create = User(username=username,email=email,password_hash=password_hash,created_at = current_time)
        db.session.add(create)
        db.session.commit()
        return jsonify({'message':'Registered Successfully!'})
    return render_template('register.html')



@app.route('/display',methods=['GET'])
def display():
    data = User.query.all()
    serialize = [serialize_data(user) for user in data]
    return render_template('display.html', serialize=serialize)


@app.route('/update/<int:id>',methods=['POST','GET'])   
def update(id):
    user = User.query.filter_by(id=id).first()
    if request.method == 'POST':
        data = request.json
        username_update = data['username']
        email_update = data['email']
        
        if user:
            user.username = username_update
            user.email = email_update
            db.session.commit()
            return jsonify({"message":"Successfully Update"}),200
            
        
    return render_template('update.html')

@app.route('/delete/<int:id>',methods=['POST','GET'])
def delete(id):
    user = User.query.filter_by(id=id).first()
    if request.method == 'POST':
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "successfully deleted!"}),200
        
    return render_template('display.html')

def serialize_data(user):
    return {
        "id":user.id,
        "username": user.username,
        "email": user.email,
        "created_at": user.created_at
    }