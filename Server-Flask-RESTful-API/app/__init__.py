from flask import Flask, request, g, abort
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api as RestfulApi
from flask_cors import CORS
from app.config.config import Config
from werkzeug.routing import BaseConverter
import uuid
import time

app = Flask(__name__)

# Custom converter for UUIDv4 strings
class UUIDConverter(BaseConverter):
    def to_python(self, value):
        try:
            return uuid.UUID(value)
        except ValueError:
            return None

    def to_url(self, value):
        return str(value)

# Register the custom converter with Flask
app.url_map.converters['uuid'] = UUIDConverter

db = SQLAlchemy()

class Api(RestfulApi):
    def handle_error(self, e):
        if isinstance(e, werkzeug.exceptions.UnsupportedMediaType):
            return {"error": "Content-Type was not application/json"}, 415
        return super().handle_error(e)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(
        app,
        resources={
            r"/api/*": {"origins": ["http://localhost"]}
        },
    )
    api = Api(app)  # Use the custom Api class

        # Register before and after request handlers
    @app.before_request
    def before_request():
        # Start a timer to measure request processing time
        g.start_time = time.time()

        # Check for valid token
        # token = request.headers.get('Authorization')
        # if not token or not is_token_valid(token):
        #     abort(401)
        if request.method in ['POST', 'PUT']:
            if not request.is_json:
                abort(415)
            if not request.get_json():
                return abort(400, "Empty JSON payload provided")

    @app.after_request
    def after_request(response):
        # Measure request processing time
        duration = time.time() - g.start_time
        response.headers["X-Processing-Time"] = str(duration)
        return response
    
    with app.app_context():
        from app.models.user import User
        from app.models.product import Product
        from app.models.feedback import Feedback
        from app.models.location import Location
        from app.resources.user import UserResource, UserList
        from app.resources.product import ProductResource, ProductList
        from app.resources.location import LocationResource, LocationList
        from app.resources.feedback import FeedbackResource, FeedbackList
        from app.resources.index import Status, Stats

        api.add_resource(Status, '/api/status')
        api.add_resource(Stats, '/api/stats')
        api.add_resource(UserList, '/api/users')
        api.add_resource(UserResource, '/api/users/<uuid:user_id>')
        api.add_resource(ProductList, '/api/products')
        api.add_resource(ProductResource, '/api/products/<uuid:product_id>')
        api.add_resource(LocationList, '/api/locations')
        api.add_resource(LocationResource, '/api/locations/<uuid:location_id>')
        api.add_resource(FeedbackList, '/api/feedbacks')
        api.add_resource(FeedbackResource, '/api/feedbacks/<uuid:feedback_id>')

        db.create_all()

    return app

def register_error_handlers(app):
    @app.errorhandler(404)
    def error_404(error):
        return {"error": "Not found"}, 404

    @app.errorhandler(500)
    def error_500(error):
        return {"error": "Internal Server Error"}, 500

    @app.errorhandler(400)
    def error_400(error):
        return {"error": str(error)[17:]}, 400

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

    @app.errorhandler(415)
    def error_415(error):
        return {"error": "Unsupported Media Type"}, 415

app = create_app()
register_error_handlers(app)

if __name__ == '__main__':
    app.run(debug=True)
