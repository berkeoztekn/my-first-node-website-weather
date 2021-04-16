const { get } = require('postman-request');
const request = require('postman-request');


const getWeather = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=8e4b7cb6947f813f07228a6ac8b1f9ff&query=${latitude},${longitude}`;

    request(url, { json: true }, (error, response) => {
        

        if (error) {

            callback('Unable to connect.', undefined)

        } else if (response.body.success === false) {

            callback('Unable to find the place', undefined)

        } else {

            callback(undefined, {
                current: response.body.current.temperature,
                location: response.body.location.name
            })

        }

    })

};


module.exports = getWeather