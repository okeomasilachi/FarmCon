from flask_restful import Resource, reqparse
from app.models.feedback import Feedback
from flask import request, abort

class FeedbackResource(Resource):
    def get(self, feedback_id):
        """
        Get a specific feedback by ID.

        Args:
            feedback_id (int): The ID of the feedback.

        Returns:
            dict: A dictionary representing the feedback's data in JSON format.
        """
        feedback = Feedback.query.get_or_404(feedback_id)
        return feedback.to_dict(json=True)

    def put(self, feedback_id):
        """
        Update a specific feedback by ID.

        Args:
            feedback_id (int): The ID of the feedback.

        Returns:
            dict: A dictionary representing the updated feedback's data in JSON format.
        """
        feedback = Feedback.query.get_or_404(feedback_id)
        parser = reqparse.RequestParser()
        parser.add_argument('rating', type=int, required=True, help='Rating field is required')
        parser.add_argument('comment', type=str)
        parser.add_argument('user_id', type=int, required=True, help='User ID field is required')
        parser.add_argument('product_id', type=int, required=True, help='Product ID field is required')
        args = parser.parse_args()

        feedback.update(**args)
        return feedback.to_dict(json=True)

    def delete(self, feedback_id):
        """
        Delete a specific feedback by ID.

        Args:
            feedback_id (int): The ID of the feedback.

        Returns:
            tuple: An empty dictionary and HTTP status code 204 indicating successful deletion.
        """
        feedback = Feedback.query.get_or_404(feedback_id)
        feedback.delete()
        return {}, 204


class FeedbackList(Resource):
    def get(self):
        """
        Get a list of all feedbacks.

        Returns:
            list: A list of dictionaries representing each feedback's data in JSON format.
        """
        feedbacks = Feedback.query.all()
        return [feedback.to_dict(json=True) for feedback in feedbacks]

    def post(self):
        """
        Create a new feedback.

        Returns:
            tuple: A dictionary representing the newly created feedback's data in JSON
            format and HTTP status code 201 indicating successful creation.
        """
        if not request.json:
           abort(400, "Empty JSON payload provided")
        parser = reqparse.RequestParser()
        parser.add_argument('rating', type=int, required=True, help='Rating field is required')
        parser.add_argument('comment', type=str)
        parser.add_argument('user_id', type=int, required=True, help='User ID field is required')
        parser.add_argument('product_id', type=int, required=True, help='Product ID field is required')
        args = parser.parse_args()

        feedback = Feedback(**args)
        feedback.save()
        return feedback.to_dict(json=True), 201
