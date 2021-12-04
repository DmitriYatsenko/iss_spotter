const { fetchMyIP, fetchCoordsByIp } = require('./iss');

fetchMyIP((error, ip) => {
    if (error) {
        console.log("It didn't work!", error);
        return;
    }

    console.log('It worked! Returned IP:', ip);
});

fetchCoordsByIp((error, coordin8s) => {
    if (error) {
        console.log("It didn't work!", error);
        return;
    }
});