import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = () => {

    const [weatherStatus, setWeatherStatus] = useState ({});
    const [isCentigrade, setIsCentigrade] = useState (true);
    const [isFahrenheit, setIsFahrenheit] = useState (true);

    useEffect(() => {

        function success(pos) {
            const crd = pos.coords;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=1e4ed1d3664a452ab243e6c8d39697b6`)
                .then(res => setWeatherStatus(res.data))

          
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    console.log(weatherStatus);

    const kelvin = weatherStatus.main?.temp;
    const centigrade = kelvin - 273.15;
    const fahrenheit = (kelvin - 273.15) * 9/5 + 32;

    const kelvinSensation = weatherStatus.main?.feels_like;
    const centigradeSensation = kelvinSensation - 273.15;
    const fahrenheitSensation = (kelvinSensation - 273.15) * 9/5 + 32;

    const changeUnits = () => {
        setIsCentigrade(!isCentigrade)
        setIsFahrenheit(!isFahrenheit)
    }

    return (
        <div>
            <div className='weather-card'>
                <h1 className='card-title'>Weather App</h1>
                <h2 className='card-location'>{weatherStatus.name}, {weatherStatus.sys?.country}</h2>
                <div className='data-container'>
                    <div className='main-data'>
                        <img className='weather-img' src={`http://openweathermap.org/img/wn/${weatherStatus.weather?.[0].icon}@2x.png`} alt="weather-icon" />
                        <p className='temperature'>{isCentigrade ? centigrade.toFixed(2) : fahrenheit.toFixed(2)} {isCentigrade ? '°C' : '°F'}</p>
                    </div>
                    <ul className='secondary-data'>
                        <li><i className="fa-solid fa-calendar-day"></i> Weather: <span>{weatherStatus.weather?.[0].description}</span></li>
                        <li><i className="fa-solid fa-wind"></i> Wind Speed: <span>{weatherStatus.wind?.speed} m/s</span></li>
                        <li><i className="fa-solid fa-droplet"></i> Humidity: <span>{weatherStatus.main?.humidity}%</span></li>
                        <li><i className="fa-solid fa-temperature-half"></i> Thermal Sensation: <span>{isCentigrade ? centigradeSensation.toFixed(2) : fahrenheitSensation.toFixed(2)} {isCentigrade ? '°C' : '°F'}</span></li>
                    </ul>
                </div>
                <button className='weather-btn' onClick={changeUnits}>Change degrees °C/°F</button>
            </div>
        </div>
    );
};

export default Weather;