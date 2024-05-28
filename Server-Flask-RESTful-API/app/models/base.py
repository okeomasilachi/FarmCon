from datetime import datetime
from app import db
from flask import jsonify
import uuid


class BaseModel(db.Model):
    __abstract__ = True  # This ensures that SQLAlchemy does not create a table for this model

    id = db.Column(db.String(60), primary_key=True,
                   default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key, value in kwargs.items():
            setattr(self, key, value)
        if not self.id:
            self.id = str(uuid.uuid4())
        if not self.created_at:
            self.created_at = datetime.utcnow()
        if not self.updated_at:
            self.updated_at = self.created_at

    def save(self):
        """Save the current instance."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete the current instance."""
        db.session.delete(self)
        db.session.commit()

    def update(self, **kwargs):
        """ Update the current instance with new data."""
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.updated_at = datetime.utcnow()
        db.session.commit()

    def to_dict(self, json=False):
        """ Convert the model instance to a dictionary."""
        result = {column.name: getattr(self, column.name)
                  for column in self.__table__.columns}
        result["created_at"] = self.created_at.isoformat(
        ) if self.created_at else None
        result["updated_at"] = self.updated_at.isoformat(
        ) if self.updated_at else None
        if json:
            return jsonify(result)
        return result
