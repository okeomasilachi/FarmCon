from flask_restful import Resource, reqparse
from app.models.user import User


class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return user.to_dict(json=True)

    def put(self, user_id):
        user = User.query.get_or_404(user_id)
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=True,
                            help='id field is required')
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('role', type=str)
        args = parser.parse_args()

        user.update(**args)
        return user.to_dict(json=True)

    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        user.delete()
        return {}, 204


class UserList(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict(json=True) for user in users]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True, help='Username field is required')
        parser.add_argument('email', type=str, required=True, help='Email field is required')
        parser.add_argument('password', type=str, required=True, help='Password field is required')
        parser.add_argument('role', type=str, required=True, help='Role field is required')
        args = parser.parse_args()

        user = User(**args)
        user.save()
        return user.to_dict(json=True), 201
