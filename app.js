const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
        console.log(`Fetching weather information for ${results.address}...`);
        
        // lat, lng, callback
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature} degrees Celcius. But, feels like ${weatherResults.apparentTemperature} degrees Celcius.`);
            }
        });
    }
});

