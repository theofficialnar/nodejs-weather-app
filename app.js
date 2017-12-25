const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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

//call to method geocodeAddress from geocode.js
geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});

geocode.temperature();