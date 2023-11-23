let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
let api_key = '813c030ac6f8d13f4f14cc750d1e485c';
let difKelvin = 273.15;

document.getElementById('button').addEventListener('click', () => {
    const city = document.getElementById('cityEnter').value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    fetch(`${urlBase}?q=${city}&appid=${api_key}`)
        .then(data => data.json())
        .then(data => {
            showWeatherData(data);
            displayDate(); // Llamar a la función para mostrar la fecha después de obtener los datos climáticos
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayDate() {
    const currentDate = new Date();

    const options = { day: 'numeric', month: 'short' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const date = document.createElement('div');
    date.classList.add('date');
    date.textContent = formattedDate;

    const widget = document.querySelector('.widget');
    if (widget) {
        widget.appendChild(date);
    }
}


function showWeatherData(data) {
    const divWeatherData = document.getElementById('weatherData');
    divWeatherData.innerHTML = '';

    if (data && data.sys) {
        const cityName = data.name;
        const countryName = data.sys.country;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const widget = document.createElement('div');
        widget.classList.add('widget');

        const weatherIcon = document.createElement('div');
        weatherIcon.classList.add('weatherIcon');

        const Icon = document.createElement('img');
        Icon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        const weatherInfo = document.createElement('div');
        weatherInfo.classList.add('weatherInfo');

        const descriptions = document.createElement('div');
        descriptions.classList.add('descriptions');

        const temperatureInfo = document.createElement('div');
        temperatureInfo.classList.add('temperatureInfo');
        temperatureInfo.textContent = `${Math.floor(temperature - difKelvin)}ºC`;

        const contenedor = document.createElement('div');
        contenedor.classList.add('contenedor');

        const cityTitle = document.createElement('div');
        cityTitle.classList.add('cityTitle');
        cityTitle.textContent = `${cityName}, ${countryName}`;

        const humidityInfo = document.createElement('div');
        humidityInfo.classList.add('humidityInfo');
        humidityInfo.textContent = `${humidity}% H`;

        const descriptionInfo = document.createElement('div');
        descriptionInfo.classList.add('descriptionInfo');
        descriptionInfo.textContent = `${description}`;

        const date = document.createElement('div');
        date.classList.add('date');

        widget.appendChild(weatherIcon);
        weatherIcon.appendChild(Icon);
        widget.appendChild(weatherInfo);
        weatherInfo.appendChild(temperatureInfo);
        weatherInfo.appendChild(contenedor);
        contenedor.appendChild(cityTitle);
        contenedor.appendChild(descriptions);
        weatherInfo.appendChild(humidityInfo);
        weatherInfo.appendChild(date);
        descriptions.appendChild(descriptionInfo);
        divWeatherData.appendChild(widget);
    }
}
