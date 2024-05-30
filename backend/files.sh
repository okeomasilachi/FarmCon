#!/bin/bash

# MongoDB Configuration
MONGODB_HOST="localhost"
MONGODB_PORT="27017"
MONGODB_DB="files_manager"
MONGODB_COLLECTION=$1

# Connect to MongoDB and query the collection
mongo --host $MONGODB_HOST --port $MONGODB_PORT --quiet $MONGODB_DB <<EOF
db.$MONGODB_COLLECTION.find().forEach(printjson)
EOF
