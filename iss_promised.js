const request = require('request-promise-native');

const nextISSTimesForMyLocation = function () {
    return fetchMyIP()
        .then(fetchCoordsByIP)
        .then(fetchISSFlyOverTimes)
        .then((data) => {
            const { response } = JSON.parse(data);
            return response;
        });
};

//---------------------------------------------------------------------------------------------

const fetchMyIP = function () {
    return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function (body) {
    const ip = JSON.parse(body).ip;
    return request(`https://freegeoip.app/json/${ip}`);
}

//GIVEN SOLUTION-------------------------------------------------------------------------------

const fetchISSFlyOverTimes = function (body) {
    const { latitude, longitude } = JSON.parse(body);
    const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
    return request(url);
};

//MY CODE--------------------------------------------------------------------------------------
/*
const fetchISSFlyOverTimes = function (body) {
    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
}
*/

module.exports = { nextISSTimesForMyLocation };

//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };