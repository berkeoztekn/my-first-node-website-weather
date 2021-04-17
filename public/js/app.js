console.log('Client side javascript was loaded!')


const fetchWeather = (address, callback) => {
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                callback(data.error, undefined)
            } else {
                callback(undefined, data)
            }
        })
    })
}

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

const form = document.querySelector('form')

const search = document.querySelector('input')


form.addEventListener('submit', (e) => {

    e.preventDefault()

    const input = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetchWeather(input, (error, { current, location } = {}) => {
        if (error) {
            messageOne.textContent = error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = current
            messageTwo.textContent = location
        }
    })

})