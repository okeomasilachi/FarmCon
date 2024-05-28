from flask_restful import Resource
from flask import jsonify as js
from app.models.user import User
from app.models.product import Product
from app.models.location import Location


class Status(Resource):
    def get(self):
        """
        Get the status of the API.

        Returns:
            A JSON response with the status 'ok'.
        """
        return js({'status': 'ok'})


class Stats(Resource):
    def get(self):
        """
        Get the statistics of the API.

        Returns:
            A JSON response with the number of users, products, and
            locations in the database.
        """
        users = User.query.all()
        products = Product.query.all()
        locations = Location.query.all()

        return js({'users': len(users), 'products': len(products), 'locations': len(locations)})
