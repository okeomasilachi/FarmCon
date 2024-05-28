from flask_restful import Resource, reqparse
from app.models.location import Location
from flask import request, abort

class LocationResource(Resource):
    def get(self, location_id):
        """
        Get a specific location by ID.

        Args:
            location_id (int): The ID of the location.

        Returns:
            dict: A dictionary representing the location's data in JSON format.
        """
        location = Location.query.get_or_404(location_id)
        return location.to_dict(json=True)

    def put(self, location_id):
        """
        Update a specific location by ID.

        Args:
            location_id (int): The ID of the location.

        Returns:
            dict: A dictionary representing the updated location's data in JSON format.
        """
        location = Location.query.get_or_404(location_id)
        parser = reqparse.RequestParser()
        parser.add_argument('state', type=str)
        parser.add_argument('address', type=str)
        parser.add_argument('latitude', type=float)
        parser.add_argument('longitude', type=float)
        args = parser.parse_args()

        location.update(**args)
        return location.to_dict(json=True)

    def delete(self, location_id):
        """
        Delete a specific location by ID.

        Args:
            location_id (int): The ID of the location.

        Returns:
            tuple: An empty dictionary and HTTP status code 204 indicating successful deletion.
        """
        location = Location.query.get_or_404(location_id)
        location.delete()
        return {}, 204


class LocationList(Resource):
    def get(self):
        """
        Get a list of all locations.

        Returns:
            list: A list of dictionaries representing each location's data in JSON format.
        """
        locations = Location.query.all()
        return [location.to_dict(json=True) for location in locations]

    def post(self):
        """
        Create a new location.

        Returns:
            tuple: A dictionary representing the newly created location's data in JSON
            format and HTTP status code 201 indicating successful creation.
        """
        if not request.json:
           abort(400, "Empty JSON payload provided")
        parser = reqparse.RequestParser()
        parser.add_argument('state', type=str, required=True, help='State field is required')
        parser.add_argument('address', type=str, required=True, help='Address field is required')
        parser.add_argument('latitude', type=float, required=False)
        parser.add_argument('longitude', type=float, required=False)
        args = parser.parse_args()

        location = Location(**args)
        location.save()
        return location.to_dict(json=True), 201
