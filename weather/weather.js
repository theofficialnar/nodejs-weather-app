const request = require('request');
const axios = require('axios');

//old request
var getWeather = (lat, lng, callback) => {
    request({
        url : `https://api.darksky.net/forecast/0b74a898293475de2d0d3e47b6dc8951/${lat},${lng}?units=si`,
        json : true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature : body.currently.temperature,
                apparentTemperature : body.currently.apparentTemperature
             });
        } else {
            callback('Unable to connect to Dark Sky Servers.');
        };
    });
};

var fetchWeather = (address) => {
    //fetch lat, lng using google api
    var encodedAddress = encodeURIComponent(address);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    //axios.get === http request
    axios.get(geocodeUrl).then((response) => {

    //throw error if response is 0 results
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find the address.');
    };

    //fetch weather using geocode results
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/0b74a898293475de2d0d3e47b6dc8951/${lat},${lng}?units=si`;
    console.log(`Fetching weather for ${response.data.results[0].formatted_address}...`);
    return axios.get(weatherUrl);

    }).then((response) => {

        //print out weather data
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`Current Temperature is ${temperature} degrees celcius, but feels like ${apparentTemperature} degrees celcius.`);

    }).catch((err) => {

        //throw error when encountered
        if (err.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(err.message);
        }
    });
}

module.exports = {
    getWeather,
    fetchWeather
};