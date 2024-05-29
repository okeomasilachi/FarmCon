from app import db
from app.models.base import BaseModel


class Location(BaseModel):
    """Location model class."""
    __tablename__ = 'locations'
    state = db.Column(db.String(100), nullable=False)
    address = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    products = db.relationship('Product', backref='location', lazy=True)
