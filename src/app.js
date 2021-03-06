const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const { prototype } = require('events')

const app = express()
const port = process.env.PORT || 3000

const publicDirctoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirctoryPath))


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: 'Berke Öztekin'
    })

})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Page',
        name: 'Berke Öztekin'
    })

})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Berke Öztekin'
    })

})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You have to provide a address'
        })
    }

    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }


        weather(latitude, longitude, (error, data) => {

            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                current: data.current,
                location,
                address: req.query.address
            })

        })

    })

})

app.get('/products', (req, res) => {

    console.log(req.query);

    res.send({
        data: []
    })
})


app.get('/help/*', (req, res) => {

    res.render('404Page', {
        errorMessage: 'Help article not found.',
        name: 'Berke Öztekin',
        title: '404'
    })

})

app.get('*', (req, res) => {
    res.render('404Page', {
        errorMessage: 'Page not found.',
        name: 'Berke Öztekin',
        title: '404'
    })
})





app.listen(port, () => {
    console.log('Server is up on port ' +  port)
})

