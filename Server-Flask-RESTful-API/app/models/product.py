from app import db
from app.models.base import BaseModel
from app.models import ProductStatus
import enum import Enum
import enum


class ProductStatus(Enum):
    """Enumeration for product statuses."""
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"


class Product(BaseModel):
    """Product model class."""
    __tablename__ = 'products'
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    planting_period_start = db.Column(db.DateTime, nullable=False)
    planting_period_end = db.Column(db.DateTime, nullable=False)
    harvesting_period_start = db.Column(db.DateTime, nullable=False)
    harvesting_period_end = db.Column(db.DateTime, nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=False)
    rate_of_production = db.Column(db.Float, nullable=False)
    status = db.Column(db.Enum(ProductStatus), nullable=False, default=ProductStatus.PENDING)
    feedbacks = db.relationship('Feedback', backref='product', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key to User table
    