from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///faces.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class DetectedFace(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    face_id = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100))
    role = db.Column(db.String(50))
    confidence = db.Column(db.Float)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    image_path = db.Column(db.String(200))
    
    def __repr__(self):
        return f'<DetectedFace {self.face_id} - {self.name}>'

# Create database tables
with app.app_context():
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Handle face detection data
        face_id = f"EMP{str(uuid.uuid4())[:4].upper()}"  # Generate EMPXXXX format ID
        name = request.form.get('name', 'Unknown')
        role = request.form.get('role', 'Visitor')
        confidence = float(request.form.get('confidence', 0))
        
        new_face = DetectedFace(
            face_id=face_id,
            name=name,
            role=role,
            confidence=confidence
        )
        
        try:
            db.session.add(new_face)
            db.session.commit()
            return redirect(url_for('body_recognition'))
        except Exception as e:
            return f'There was an issue adding the face: {str(e)}'
    
    # Get all detected faces ordered by timestamp
    faces = DetectedFace.query.order_by(DetectedFace.timestamp.desc()).all()
    return render_template('body_recognition.html', faces=faces)

@app.route('/delete/<string:face_id>')
def delete_face(face_id):
    face_to_delete = DetectedFace.query.get_or_404(face_id)
    try:
        db.session.delete(face_to_delete)
        db.session.commit()
        return redirect(url_for('body_recognition'))
    except Exception as e:
        return f'There was an issue deleting that face: {str(e)}'

@app.route('/update/<string:face_id>', methods=['GET', 'POST'])
def update_face(face_id):
    face = DetectedFace.query.get_or_404(face_id)
    
    if request.method == 'POST':
        face.name = request.form['name']
        face.role = request.form['role']
        face.confidence = float(request.form['confidence'])
        
        try:
            db.session.commit()
            return redirect(url_for('body_recognition'))
        except:
            return 'There was an issue updating the face'
    
    return render_template('body_recognition.html', face=face)

if __name__ == "__main__":
    with app.app_context():  # ✅ This creates the database & tables
        db.create_all()
    app.run(debug=True)