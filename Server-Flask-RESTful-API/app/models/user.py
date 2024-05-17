from app import db
from app.models.base import BaseModel
from app.models import UserRole
import enum


class UserRole(enum.Enum):
    """Enumeration for user roles."""
    SUPER_ADMIN = "Super Admin"
    ADMIN = "Admin"
    USER = "User"


class User(BaseModel):
    """User model class."""
    __tablename__ = 'users'
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False)
    products = db.relationship('Product', backref='user', lazy=True)
    feedbacks = db.relationship('Feedback', backref='user', lazy=True)
