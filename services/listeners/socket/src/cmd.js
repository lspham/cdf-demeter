var redis = require("redis"),
    redisClient = redis.createClient();

redisClient.publish('things/862118025168888/cmd', '#1,1');

