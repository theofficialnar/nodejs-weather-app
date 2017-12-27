const request = require('request');
const fs = require('fs');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    //(options, callback)
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,

        //tells request that the data is json and it will convert it to object
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google Servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

var defaultAddress = (address) => {
    var defAdd = {
        address
    };
    fs.writeFileSync('default_location.json', JSON.stringify(defAdd));
    return defAdd;
};

var fetchDefault = () => {
    return new Promise((resolve, reject) => {
        try {
            var result = fs.readFileSync('default_location.json');
            var parsedResult = JSON.parse(result);
            resolve(parsedResult);
        } catch (e) {
            reject('No default address set.');
        }
    })
};

module.exports = {
    geocodeAddress,
    defaultAddress,
    fetchDefault
};