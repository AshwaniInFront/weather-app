import { useEffect, useState } from 'react';
import './WeatherConditions.css';
import { images } from '../Images/index'; // Import the images object
import { useStyles } from '../MuiTheme/styles';

const WeatherConditions = ({ weatherData, humidity, wind, sunrise, sunset, visibility, clouds, airpressure }) => {

    const [sunrisetime, setSunriseTime] = useState();
    const [sunsetime, setSunsetTime] = useState();

    function calculateSunrise(sunrise) {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(sunrise * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        setSunriseTime(formattedTime);
    }

    function calculateSunset(sunset) {
        var date = new Date(sunset * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        setSunsetTime(formattedTime);
    }

    useEffect(() => {
        calculateSunrise(weatherData.sys.sunrise);
        calculateSunset(weatherData.sys.sunset);
    },[]);

    const classes = useStyles();

    return (
        <div className= {classes.weatherconditionsWrapper} >
            <div className = {`${classes.humidityBlock} ${classes.weatherBlock}`} >
                <div className= {classes.weatherMeasurementImages}>
                    <img src={images.humidityImage} />
                </div>
                <h4>Humidity</h4>
                <h1>
                    {weatherData.main.humidity}%
                </h1>
            </div>
            <div className= {`${classes.windBlock} ${classes.weatherBlock}`}>
                <img src={images.windImage} />
                <h4>Wind Status</h4>
                <h1>{weatherData.wind.speed * 10} Km/h</h1>
            </div>
            <div className={`${classes.sunriseBlock} ${classes.weatherBlock}`}>
                <div className='sunrise-info'>                
                   <img src={images.sunriseImage}/> 
                   <h1>Sunrise:{sunrisetime}</h1>
                </div>
                <div className={`${classes.sunriseInfo} ${classes.weatherBlock}`}>
                    <img src={images.sunsetImage}/>
                    <h1>Sunset:{sunsetime}</h1>
                </div>
            </div>
            <div className='visibility-block weather-block'>
                <h4>Visibility</h4>
                <img src={images.visibilityImage}/>
                <h1>{weatherData.visibility} Km</h1>
            </div>
            <div className='clouds-block weather-block'>
                <h4>Clouds</h4>
                <img src={images.cloudImage}/>
                <h1>{weatherData.clouds.all} %</h1>
            </div>
            <div className='airpressure-block weather-block'>
                <h4>Airpressure</h4>
                <img src={images.freshAirImage}/>
                <h1>{weatherData.main.pressure} hPa</h1>
            </div>
        </div>
    )
}

export default WeatherConditions