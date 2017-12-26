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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

//axios.get === http request
axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find the address.');
    }
    console.log(response.data);
}).catch((err) => {
    //console.log(err);
    if (err.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(err.message);
    }
});