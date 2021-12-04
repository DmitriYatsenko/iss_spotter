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
            fetchCoordsByIP(ip, (error, coordin8s) => {
                if (error) {
                    console.log("It didn't work!", error);
                    return;
                }
                console.log('It worked! Returned coordin8s:', coordin8s);
            });
            return callback(null, ip);
        }
    });
}

const fetchCoordsByIP = function (ip, callback) {
    request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching coord-n8s 4 IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        } else {
            const latitude = JSON.parse(body).latitude;
            const longitude = JSON.parse(body).longitude;
            const coordin8s = {};
            coordin8s['latitude'] = latitude;
            coordin8s['longitude'] = longitude;
            //console.log(coordin8s);
            fetchISSFlyOverTimes(coordin8s, (error, flyoverTimes) => {
                if (error) {
                    console.log("It didn't work!", error);
                    return;
                }
                console.log('It worked! Returned flyover times:', flyoverTimes);
            });
            return callback(null, coordin8s);
        }
    });
}

const fetchISSFlyOverTimes = function (coordin8s, callback) {
    request(`https://iss-pass.herokuapp.com/json/?lat=${coordin8s.latitude}&lon=${coordin8s.longitude}`, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        }
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching flyover times 4 loc8n coord-n8s. Response: ${body}`;
            callback(Error(msg), null);
            return;
        } else {
            const flyoverTimes = JSON.parse(body).response;
            return callback(null, flyoverTimes);
        }
    });
};

/*
const fetchCoordsByIP = function (ip, callback) {
    request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        }

        if (response.statusCode !== 200) {
            callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
            return;
        }

        const { latitude, longitude } = JSON.parse(body);
        callback(null, { latitude, longitude });
    });
};
*/

module.exports = { fetchMyIP, fetchCoordsByIP };