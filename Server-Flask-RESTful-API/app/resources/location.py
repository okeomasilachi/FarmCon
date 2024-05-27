from flask_restful import Resource, reqparse
from app.models import Location

class LocationResource(Resource):
    def get(self, id):
        location = Location.query.get_or_404(id)
        return location.as_dict()

    def put(self, id):
        args = location_parser.parse_args()
        location = Location.query.get_or_404(id)
        location.state = args['state']
        location.address = args['address']
        location.latitude = args.get('latitude')
        location.longitude = args.get('longitude')
        db.session.commit()
        return location.as_dict()

    def delete(self, id):
        location = Location.query.get_or_404(id)
        db.session.delete(location)
        db.session.commit()
        return '', 204

class LocationListResource(Resource):
    def get(self):
        locations = Location.query.all()
        return [location.as_dict() for location in locations]

    def post(self):
        args = location_parser.parse_args()
        new_location = Location(
            state=args['state'],
            address=args['address'],
            latitude=args.get('latitude'),
            longitude=args.get('longitude')
        )
        db.session.add(new_location)
        db.session.commit()
        return new_location.as_dict(), 201
