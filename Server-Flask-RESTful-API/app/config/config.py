import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """
    Configuration class for the Flask application.

    Attributes:
        SECRET_KEY (str): The secret key used for session encryption.
        SQLALCHEMY_DATABASE_URI (str): The URI for the database connection.
        SQLALCHEMY_TRACK_MODIFICATIONS (bool): Flag to enable/disable modification tracking.
    """

    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///farmcon.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
