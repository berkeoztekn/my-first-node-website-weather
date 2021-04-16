const request = require('postman-request');

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmVya2VvenRla24iLCJhIjoiY2tuNTFibzMxMDB6ZjJ2cnhsazNrNzJlZiJ9.UQs016VtiM8wDI3TNit1RA&limit=1`

    request(url, { json: true }, (error, response) => {

        if (error) {

            callback('Unable to connect server.', undefined);

        } else if (response.body.features.length === 0) {

            callback('Unable the find location!', undefined)

        } else {

            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })

        }



    })
};

module.exports = geocode;
