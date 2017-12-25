const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    //(options, callback)
    request({
        url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        
        //tells request that the data is json and it will convert it to object
        json : true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google Servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address : body.results[0].formatted_address,
                latitude : body.results[0].geometry.location.lat,
                longitude : body.results[0].geometry.location.lng
            });
        }
    });
};

var temperature = () => {
    request({
        url : 'https://api.darksky.net/forecast/0b74a898293475de2d0d3e47b6dc8951/37.8267,-122.4233?units=si',
        json : true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(`Temperature: ${body.currently.temperature} degrees celcius.`);
        } else {
            console.log('Unable to connect to Dark Sky Servers.');
        }
        
    })
}

module.exports = {
    geocodeAddress,
    temperature
}