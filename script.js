const weatherApp = (() => {
    let currentUnits = 'metric';

    const unitsButton = document.querySelector('#units');
    unitsButton.addEventListener('click', () => {
        if (unitsButton.textContent === '°C') {
            unitsButton.textContent = '°F';
            currentUnits = 'imperial'
            console.log(currentUnits);
        } else {
            unitsButton.textContent = '°C';
            currentUnits = 'metric';
            console.log(currentUnits);
        }
    })

    const input = document.querySelector('input');
    input.addEventListener('keydown', (key) => {
        if (key.code === 'Enter') {
            initiateDisplay();
        }
    })

    const searchButton = document.querySelector('#search');
    searchButton.addEventListener('click', () => {
        initiateDisplay();
    })

    function initiateDisplay() {
        if (input.value.trim() !== '') {
            let inputValue = input.value.toLowerCase().trim();
            let extractedData = fetchWeatherData(inputValue)
            extractedData.then((data) => {
                displayWeatherData(data);
            })
        }
    }

    async function fetchWeatherData(city) {
        let cityString = city.toLowerCase().trim().replaceAll(' ', '+');
        let response
        try {
            if (currentUnits === 'metric') {
                response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityString}&units=metric&APPID=d2c0c1fef0683f8a6eff0a63e9b895cd`, {mode:'cors'});
            } else {
                response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityString}&units=imperial&APPID=d2c0c1fef0683f8a6eff0a63e9b895cd`, {mode:'cors'});
            }

            let weatherData = await response.json();

            let requiredData = {
                city: weatherData.name,
                country: weatherData.sys.country,
                temperature: weatherData.main.temp,
                mainDescription: weatherData.weather[0].main,
                description: weatherData.weather[0].description,
                currentTime: weatherData.dt,
                sunrise: weatherData.sys.sunrise,
                sunset: weatherData.sys.sunset,
                feelsLike: weatherData.main.feels_like,
                tempMin: weatherData.main.temp_min,
                tempMax: weatherData.main.temp_max,
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed
            }

            return requiredData;
        } catch(err) {
            alert('City Not Found');
        }
    }


    const location = document.querySelector('#location');
    const temperature = document.querySelector('#temperature');
    const description = document.querySelector('#description');
    const weatherIcon = document.querySelector('#weatherIcon');
    const feelsLike = document.querySelector('#feelsLike');
    const min = document.querySelector('#min');
    const max = document.querySelector('#max');
    const humidity = document.querySelector('#humidity');
    const wind = document.querySelector('#wind');


    function displayWeatherData(data) {
        location.textContent = `${data.city.toUpperCase()}, ${data.country}`;
        description.textContent = `${data.description.toUpperCase()}`;
        humidity.textContent = `Humidity: ${data.humidity}%`;

        displayWeatherIcon(data);

        if (currentUnits === 'metric') {
            temperature.textContent = `${Math.round(data.temperature)}°C`;
            feelsLike.textContent = `Feels Like: ${Math.round(data.feelsLike)}°C`;
            min.textContent = `Min: ${Math.round(data.tempMin)}°C`;
            max.textContent = `Max: ${Math.round(data.tempMax)}°C`;
            wind.textContent = `Wind Speed: ${data.windSpeed} m/s`
        } else {
            temperature.textContent = `${Math.round(data.temperature)}°F`;
            feelsLike.textContent = `Feels Like: ${Math.round(data.feelsLike)}°F`;
            min.textContent = `Min: ${Math.round(data.tempMin)}°F`;
            max.textContent = `Max: ${Math.round(data.tempMax)}°F`;
            wind.textContent = `Wind speed: ${data.windSpeed} mph`
        }
    }


    function displayWeatherIcon(data) {
        if (data.mainDescription.toLowerCase() === 'rain') {
            weatherIcon.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-rain" width="100" height="100" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />
                    <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
                </svg>`;
        } else if (data.mainDescription.toLowerCase() === 'snow') {
            weatherIcon.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-snow" width="100" height="100" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />
                    <path d="M11 15v.01m0 3v.01m0 3v.01m4 -4v.01m0 3v.01" />
                </svg>`;
        } else if (data.mainDescription.toLowerCase() === 'mist') {
            weatherIcon.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mist" width="100" height="100" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 5h3m4 0h9" />
                    <path d="M3 10h11m4 0h1" />
                    <path d="M5 15h5m4 0h7" />
                    <path d="M3 20h9m4 0h3" />
                </svg>`;
        } else if (data.mainDescription.toLowerCase() === 'clouds') {
            weatherIcon.innerHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud" width="100" height="100" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-12" />
                </svg>`;
        } else if (data.mainDescription.toLowerCase() === 'clear') {
            if (data.currentTime < data.sunrise || data.currentTime < data.sunset) {
                weatherIcon.innerHTML = 
                    `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon" width="100" height="100" viewBox="0 0 24 24" stroke-width="0.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                    </svg>`;
            } else {
                weatherIcon.innerHTML = 
                    `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sun" width="100" height="100" viewBox="0 0 24 24" stroke-width="0.5" stroke="#ffbf00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="4" />
                        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                    </svg>`;
            }
        } else {
            weatherIcon.innerHTML = '';
        }
    }

    const defaultDisplay = (() => {
        let extractedData = fetchWeatherData('hanoi')
        extractedData.then((data) => {
            displayWeatherData(data);
        })
    })();
})();
