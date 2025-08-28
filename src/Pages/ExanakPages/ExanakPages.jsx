import { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import "../ExanakPages/ExanakPages.css"

const ExanakPages = () => {
    const [city, setCity] = useState("Yerevan");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = "db8ab283a24ebf1e3706a25d03e717f6";

    // Քաղաքների նկարների հղումներ
    const cityImages = {
        "Yerevan": "https://cdn.tripster.ru/thumbs2/da7aa1f6-77b5-11ed-bdac-a67110be2909.1600x900.jpeg?width=1200&height=630",
        "Tbilisi": "https://photos.pandatur.md/c5455a3ae4183b2738ef60dd5b8bd075.jpg",
        "Batumi": "https://i.pinimg.com/originals/a0/df/e6/a0dfe6f5e2c0d3771865f01c8e7debd7.jpg",
        "Antwerp": "https://afrus.ru/nijni-novgorod/wp-content/uploads/sites/40/2022/04/antverpen.jpeg"
    };

    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case '01d':
            case '01n':
                return <WiDaySunny className="weather-icon sunny" />;
            case '02d':
            case '02n':
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                return <WiCloudy className="weather-icon cloudy" />;
            case '09d':
            case '09n':
            case '10d':
            case '10n':
                return <WiRain className="weather-icon rain" />;
            case '11d':
            case '11n':
                return <WiThunderstorm className="weather-icon thunderstorm" />;
            case '13d':
            case '13n':
                return <WiSnow className="weather-icon snow" />;
            case '50d':
            case '50n':
                return <WiFog className="weather-icon fog" />;
            default:
                return <WiDaySunny className="weather-icon" />;
        }
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const API_CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=hy`;
                const API_FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=hy`;

                setLoading(true);
                const [currentWeather, forecast] = await Promise.all([
                    axios.get(API_CURRENT_URL),
                    axios.get(API_FORECAST_URL)
                ]);
                setWeatherData(currentWeather.data);
                setForecastData(forecast.data.list);
            } catch (err) {
                setError("Տվյալները ստանալու խնդիր կա։");
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city, API_KEY]);

    if (loading) {
        return <div className="weather-box loading">Բեռնվում է...</div>;
    }

    if (error) {
        return <div className="weather-box error">{error}</div>;
    }

    if (!weatherData || !forecastData) {
        return null;
    }

    const dailyForecast = forecastData.filter((item, index) => index % 8 === 0);

    return (
        <div className="weather-container">
            <div className="city-selector">
                <select onChange={(e) => setCity(e.target.value)} value={city}>
                    <option value="Yerevan">Երևան</option>
                    <option value="Tbilisi">Թբիլիսի</option>
                    <option value="Batumi">Բաթումի</option>
                    <option value="Antwerp">Անտվերպեն</option>
                </select>
                <img
                    src={cityImages[weatherData.name]}
                    alt={`${weatherData.name} քաղաքի նկար`}
                    className="city-image"
                />
            </div>

            <div className="weather-box">
                <div className="weather-header">
                    <h1>Եղանակը {weatherData.name}-ում</h1>
                
                    {getWeatherIcon(weatherData.weather[0].icon)}
                </div>
                <div className="weather-info">
                    <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
                    <p className="description">{weatherData.weather[0].description}</p>
                </div>
                <div className="weather-details">
                    <div className="detail-item">
                        <p>Քամի</p>
                        <span>{Math.round(weatherData.wind.speed)} մ/վ</span>
                    </div>
                    <div className="detail-item">
                        <p>Խոնավություն</p>
                        <span>{weatherData.main.humidity}%</span>
                    </div>
                </div>
            </div>

            <div className="forecast-box">
                <h3>5-օրյա կանխատեսում</h3>
                <div className="forecast-list">
                    {dailyForecast.map((item, index) => (
                        <div className="forecast-item" key={index}>
                            <p>{new Date(item.dt * 1000).toLocaleDateString('hy-AM', { weekday: 'long' })}</p>
                            {getWeatherIcon(item.weather[0].icon)}
                            <p className="temp">{Math.round(item.main.temp)}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExanakPages;