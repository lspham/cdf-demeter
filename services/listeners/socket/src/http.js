var request, http;

request = require('request');
config = require('config');

http = {};

http.getRESTfulURL = function (resource) {
    return config.RESTful.server + config.RESTful.version + '/' + resource;
}

http.saveData = function (data) {
    request.post(this.getRESTfulURL(config.RESTful.resources.data), {}, function (error, response, body) {
        if (!error && response.statusCode == 200) {

        }
    });
}

module.exports = http;