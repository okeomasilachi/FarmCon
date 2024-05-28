from app import db
from app.models.base import BaseModel


class Feedback(BaseModel):
    """Feedback model class."""
    __tablename__ = 'feedbacks'
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'products.id'), nullable=False)
