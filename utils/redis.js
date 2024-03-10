import redis from 'redis';

class RedisClient {
  constructor () {
    this.client = redis.createClient();

    this.client.on('error', (err) =>
      console.error(`Redis client error: ${err}`)
    );
  }

  isAlive () {
    return this.client.connected;
  }

  async get (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async set (key, value, seconds) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', seconds, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async del (key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
