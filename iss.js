const request = require('request');

const fetchMyIP = function (callback) {
    request(`https://api.ipify.org?format=json`, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        } else {
            const ip = JSON.parse(body).ip;
            return callback(null, ip);
        }
    });
}

const fetchCoordsByIp = function (callback) {
    request(`https://api.freegeoip.app/json/?apikey=0b8ab680-549a-11ec-9627-63e5cec2c145`, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        } else {
            const latitude = JSON.parse(body).latitude;
            const longitude = JSON.parse(body).longitude;
            const coordin8s = [latitude, longitude];
            console.log(coordin8s);
            return callback(null, coordin8s);
        }
    });
}

module.exports = { fetchMyIP, fetchCoordsByIp };