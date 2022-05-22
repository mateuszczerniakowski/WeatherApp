const cloud = document.querySelector('.clouds')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const temperature = document.querySelector('.temperature')
const weather = document.querySelector('.weather')
const cityName = document.querySelector('.cityName')
const input = document.querySelector('.city')
const form = document.querySelector('form')
const icon = document.querySelector('.icon')
let locationCity;

const API_CALL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=c2fc167ef0fc2bc0cf551b9f3f3291d9'
const API_UNITS = '&units=metric'

function Main() {
    navigator.geolocation.getCurrentPosition(showPosition).showPosition()
}


function showPosition(position) {
    const Latitude = position.coords.latitude
    const Longitude = position.coords.longitude;
    console.log(Latitude, Longitude);
    const URL = `https://us1.locationiq.com/v1/reverse.php?key=pk.7754ba17cf52c3e1f24c836c49e3bb36&lat=${Latitude}&lon=${Longitude}&format=json`
    axios.get(URL).then(res => {
        locationCity = res.data.address.city
        getCity(locationCity)
    }).catch(err => console.error(err))
}

function getCity(city = input.value) {
    let URL = `${API_CALL}${city}${API_KEY}${API_UNITS}`
    axios.get(URL).then(res => {
        wind.textContent = Math.round(res.data.wind.speed)
        cloud.textContent = res.data.clouds.all
        temperature.textContent = Math.round(res.data.main.temp)
        humidity.textContent = res.data.main.humidity
        cityName.textContent = res.data.name
        weather.textContent = res.data.weather[0].main
    }).catch(err => console.error(err))
    input.value = ''
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getCity()
})
document.addEventListener('DOMContentLoaded', Main)
