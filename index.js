//GIVEN SOLUTION BECAUSE IT'S ALMOST 2 AM-----------------------------------------------------

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function (passTimes) {
    for (const pass of passTimes) {
        const datetime = new Date(0);
        datetime.setUTCSeconds(pass.risetime);
        const duration = pass.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
}

nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
        return console.log("It didn't work!", error);
    }
    printPassTimes(passTimes);
})

//MY CODE-------------------------------------------------------------------------------------

/*
const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
    if (error) {
        console.log("It didn't work!", error);
        return;
    }
    console.log('It worked! Returned IP:', ip);
})
*/

module.exports = { nextISSTimesForMyLocation, printPassTimes };