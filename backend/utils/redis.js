const redis = require('redis');

/**
 * Represents a Redis client.
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client
      .on('error', (err) => {
        console.error(err);
      });
  }

  /**
   * Checks if the Redis client is alive and connected.
   * @returns {boolean} True if the client is connected, false otherwise.
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Retrieves the value associated with the given key from Redis.
   * @param {string} key - The key to retrieve the value for.
   * @returns {Promise<string>} A promise that resolves to the value, or rejects with an error.
   */
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  /**
   * Sets the value associated with the given key in Redis.
   * @param {string} key - The key to set the value for.
   * @param {string} value - The value to set.
   * @param {number} durationSeconds - The duration in seconds for which the value should be stored.
   * @returns {Promise<string>} A promise that resolves to the Redis reply,
   *    or rejects with an error.
   */
  async set(key, value, durationSeconds) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value,
        'EX', durationSeconds, (err, reply) => {
          if (err) {
            reject(err);
          } else {
            resolve(reply);
          }
        });
    });
  }

  /**
   * Deletes the value associated with the given key from Redis.
   * @param {string} key - The key to delete.
   * @returns {Promise<number>} A promise that resolves to the number
   *    of keys deleted, or rejects with an error.
   */
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
