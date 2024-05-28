from flask_restful import Resource, reqparse
from flask import request, abort
from app.models.user import User


class UserResource(Resource):
    """
    Resource for handling individual user operations.
    """

    def get(self, user_id):
        """
        Get a specific user by ID.

        Args:
            user_id (str): The ID of the user.

        Returns:
            dict: A dictionary representing the user's data in JSON format.
        """
        user = User.query.get_or_404(user_id)
        return user.to_dict(json=True)

    def put(self, user_id):
        """
        Update a specific user by ID.

        Args:
            user_id (int): The ID of the user.

        Returns:
            dict: A dictionary representing the updated user's data in JSON format.
        """
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
        """
        Delete a specific user by ID.

        Args:
            user_id (int): The ID of the user.

        Returns:
            tuple: An empty dictionary and HTTP status code 204 indicating successful deletion.
        """
        user = User.query.get_or_404(user_id)
        user.delete()
        return {}, 204


class UserList(Resource):
    """
    Resource for handling user list operations.
    """

    def get(self):
        """
        Get a list of all users.

        Returns:
            list: A list of dictionaries representing each user's data in JSON format.
        """
        users = User.query.all()
        return [user.to_dict(json=True) for user in users]

    def post(self):
        """
        Create a new user.

        Returns:
            tuple: A dictionary representing the newly created user's data in JSON
            format and HTTP status code 201 indicating successful creation.
        """
        if not request.json:
           abort(400, "Empty JSON payload provided")

        parser = reqparse.RequestParser()
        print(request.json)
        parser.add_argument('username', type=str, required=True, help='Username field is required')
        parser.add_argument('email', type=str, required=True, help='Email field is required')
        parser.add_argument('password', type=str, required=True, help='Password field is required')
        parser.add_argument('role', type=str, required=True, help='Role field is required')
        args = parser.parse_args()
        user = User(**args)
        user.save()
        return user.to_dict(json=True), 201
