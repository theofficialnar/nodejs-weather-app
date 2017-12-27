const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a : {
            //demand : true,
            alias : 'address',
            describe : 'Address to fetch weather data.',
            string : true
        },
        d : {
            alias : 'default',
            describe : 'Set default address',
            string : true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//command setup
if (argv.default !== undefined) {
    //set default address
    var defaultAddress = argv.default;
    var defAddress = geocode.defaultAddress(defaultAddress);
    console.log(`Default address set to ${defAddress.address}.`);
} else if (argv.address !== undefined) {
    //fetch input address' weather
    weather.fetchWeather(argv.address);
} else {
    //fetch default address' weather or throw error if none set
    geocode.fetchDefault().then((res) => {
        weather.fetchWeather(res.address);
    }).catch((err) => {
        console.error(err);
    });
}