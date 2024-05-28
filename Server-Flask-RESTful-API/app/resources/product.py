from flask_restful import Resource, reqparse
from app.models.product import Product
from flask import request, abort

class ProductResource(Resource):
    """
    Resource for handling individual product operations.
    """

    def get(self, product_id):
        """
        Get a specific product by its ID.

        Args:
            product_id (int): The ID of the product.

        Returns:
            dict: A dictionary representing the product in JSON format.
        """
        product = Product.query.get_or_404(product_id)
        return product.to_dict(json=True)

    def put(self, product_id):
        """
        Update a specific product by its ID.

        Args:
            product_id (int): The ID of the product.

        Returns:
            dict: A dictionary representing the updated product in JSON format.
        """
        product = Product.query.get_or_404(product_id)
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=True, help='id field is required')
        parser.add_argument('name', type=str)
        parser.add_argument('description', type=str)
        parser.add_argument('planting_period_start', type=str)
        parser.add_argument('planting_period_end', type=str)
        parser.add_argument('harvesting_period_start', type=str)
        parser.add_argument('harvesting_period_end', type=str)
        parser.add_argument('location_id', type=int)
        parser.add_argument('rate_of_production', type=float)
        parser.add_argument('status', type=str)
        args = parser.parse_args()

        product.update(**args)
        return product.to_dict(json=True)

    def delete(self, product_id):
        """
        Delete a specific product by its ID.

        Args:
            product_id (int): The ID of the product.

        Returns:
            tuple: An empty dictionary and HTTP status code 204.
        """
        product = Product.query.get_or_404(product_id)
        product.delete()
        return {}, 204


class ProductList(Resource):
    """
    Resource for handling product list operations.
    """

    def get(self):
        """
        Get a list of all products.

        Returns:
            list: A list of dictionaries representing the products in JSON format.
        """
        products = Product.query.all()
        return [product.to_dict(json=True) for product in products]

    def post(self):
        """
        Create a new product.

        Returns:
            tuple: A dictionary representing the created product in JSON format and HTTP status code 201.
        """
        if not request.json:
           abort(400, "Empty JSON payload provided")
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help='Name field is required')
        parser.add_argument('description', type=str, required=True, help='Description field is required')
        parser.add_argument('planting_period_start', type=str, required=True, help='Planting period start field is required')
        parser.add_argument('planting_period_end', type=str, required=True, help='Planting period end field is required')
        parser.add_argument('harvesting_period_start', type=str, required=True, help='Harvesting period start field is required')
        parser.add_argument('harvesting_period_end', type=str, required=True, help='Harvesting period end field is required')
        parser.add_argument('location_id', type=int, required=True, help='Location ID field is required')
        parser.add_argument('rate_of_production', type=float, required=True, help='Rate of production field is required')
        parser.add_argument('status', type=str, required=True, help='Status field is required')
        
        args = parser.parse_args()

        product = Product(**args)
        product.save()
        return product.to_dict(json=True), 201
