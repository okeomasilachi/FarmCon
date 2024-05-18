from flask_restful import Resource
from flask import jsonify as js

class Status(Resource):
    def get(self):
        return js({'status': 'ok'})
