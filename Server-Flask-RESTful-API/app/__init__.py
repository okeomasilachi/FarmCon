from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS
from app.config.config import Config

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)
    api = Api(app)

    with app.app_context():
        from app.resources.user import UserResource, UserList
        from app.resources.product import ProductResource, ProductList

        api.add_resource(UserList, '/api/users')
        api.add_resource(UserResource, '/api/users/<int:user_id>')
        api.add_resource(ProductList, '/api/products')
        api.add_resource(ProductResource, '/api/products/<int:product_id>')

        db.create_all()

    return app

# Error handlers


def register_error_handlers(app):
    @app.errorhandler(404)
    def error_404(error):
        return {"error": "Not found"}, 404

    @app.errorhandler(500)
    def error_500(error):
        return {"error": "Internal Server Error"}, 500

    @app.errorhandler(400)
    def error_400(error):
        return {"error": str(error)}, 400

    @app.errorhandler(401)
    def error_401(error):
        return {"error": "Unauthorized"}, 401

    @app.errorhandler(403)
    def error_403(error):
        return {"error": "Forbidden"}, 403

    @app.errorhandler(405)
    def error_405(error):
        return {"error": "Method Not Allowed"}, 405

    @app.errorhandler(409)
    def error_409(error):
        return {"error": str(error)}, 409


app = create_app()
register_error_handlers(app)
