from flask_restful import Resource, reqparse
from app.models import Product


class ProductResource(Resource):
    def get(self, product_id):
        product = Product.query.get_or_404(product_id)
        return product.to_dict(json=True)

    def put(self, product_id):
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
        product = Product.query.get_or_404(product_id)
        product.delete()
        return {}, 204


class ProductList(Resource):
    def get(self):
        products = Product.query.all()
        return [product.to_dict(json=True) for product in products]

    def post(self):
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
