const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a : {
            demand : true,
            alias : 'address',
            describe : 'Address to fetch weather data.',
            string : true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//fetch lat, lng using google api
var encodedAddress = encodeURIComponent(argv.address);
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