is_redis_running() {
  redis-server -v &> /dev/null || [[ $? -eq 1 ]];
}

# Check if Redis is running
if ! is_redis_running; then
  echo "Redis is not running. Starting..."
  sudo service redis-server start
else
  echo "Redis is already running."
  sudo service  redis-server start
fi
sudo mongod --dbpath /var/lib/mongodb

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null
then
    echo "MongoDB is not running. Starting..."
    sudo service mongod start
else
    echo "MongoDB is already running."
    # sudo service mongod start
fi
clear
