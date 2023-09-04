import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ThemeProvider, CssBaseline, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { useStyles } from '../MuiTheme/styles';
import CurrentLocation from '../CurrentLocation/CurrentLocation';
import WeatherConditions from '../WeatherConditions/WeatherConditions';
import SearchLocationForm from '../SearchLocationForm/SearchLocationForm';
import Grid from '@mui/material/Grid';
import './Home.css';
import { lightTheme, darkTheme } from '../MuiTheme/theme';
import axios from 'axios';

const Home = (props) => {

    const [post, setPost] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [nav, setNav] = useState(false);
    const [weather, setWeather] = useState('');
    const [favourites, setFavourites] = useState([]);
    const [newCity, setNewCity] = useState('');
    const [currentcity, setCurrentCity] = useState('')
    const [location, setLocation] = useState('');
    const API_KEYS = '0962a071c384998bf2a02f5badbed2a5';
    const [themeType, setThemeType] = useState('light'); // Default to light theme

    const handleThemeChange = () => {
      setThemeType(themeType === 'light' ? 'dark' : 'light');
    };
  
    const theme = themeType === 'light' ? lightTheme : darkTheme;
    const getUserLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newlatitude = position.coords.latitude;
                    const newlongitude = position.coords.longitude;
                    setLatitude(newlatitude);
                    setLongitude(newlongitude);
                    getCityName();
                },
                (error) => {
                    console.error('Error while getting location:', error.message);
                }
            );
        } else {
            alert('Your browser does not support location tracking, or permission is denied.');
        }
    };

    const getCityName = async () => {
        if (latitude && longitude) {

            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            try {
                const response = await axios.get(apiUrl);
                const data = response.data;
                console.log(data.address.state_district, 'citydata')
                // Extract the city name from the API response
                if (data && data?.address && data?.address?.state_district) {
                    const city = data.address.state_district.split(" ")[0];
                    setCurrentCity(city);
                    getWeatherData(city);
                }
            }
            catch (error) {
                console.error('Error fetching city name:', error);
            }
        }
    }

    const getWeatherData = async (city) => {

        console.log(city, 'weathercity')

        if (city) {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEYS}`;
                const response = await axios.get(url);
                console.log('jaipurr is here')

                setWeather(response?.data);
                console.log("SK1", weather)
            }

            catch (error) {
                console.error('Error while fetching weather data:', error.message);
            }
        }
    };

    useEffect(() => {
        getUserLocation();
    }, [latitude, longitude]);

    const addFavourite = (favorite) => {

        let newfavourite = [];

        if (localStorage.getItem('favorites')) {
            console.log(localStorage.getItem('favorites'), 'new favorites');
            newfavourite = JSON.parse(localStorage.getItem('favorites'));
            console.log(newfavourite, 'new favorites');
        }

        console.log(newfavourite, '2 new favorites');

        if (!newfavourite.some((alreadyFavorite) => alreadyFavorite.id === favorite.id)) {
            console.log(favorite, 'updated favourites')
            const updatedFavorites = [...newfavourite, favorite];
            setFavourites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }

    };

    const handleFavourites = () => {

        if (weather) {
            const newFavourites =
            {
                id: weather?.id,
                weatherName: weather?.name,
                weatherTemp: (weather?.main?.temp / 10).toFixed(1),
                isFavorite: true
            }
            addFavourite(newFavourites)
        }

    }

    const handleCityChange = e => {
        const updatedCity = e.target.value;
        setNewCity(updatedCity);
    }

    const handleCity = event => {
        event.preventDefault();
        getWeatherData(newCity);
    }

    const handleNav = () => {
        setNav(!nav);
        console.log('is it working', nav)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='app'>
                <button className="custom-button" onClick={handleThemeChange}>
                    Toggle Theme
                </button>
                <Grid className="navbar-container"
                    sx={{
                        width: '100%',
                        maxWidth: '800',
                    }}
                    onClick={handleNav}
                >
                    <Box>
                        {nav == true ?
                            <Box>
                                <div>
                                    <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2>
                                </div>
                                <div className="user-location">
                                    {post}
                                </div>
                            </Box>
                            :
                            <Box>

                            </Box>
                        }
                        <Link to="/addtofavourites" style={{ color: '#FFF', textDecoration: 'none' }}>
                            Add to Favourites
                        </Link>
                    </Box>
                </Grid>
                <Box className="weather-wrapper" >
                    {weather ?
                        <>
                            <Box className="weather-block" >
                                <Box>
                                    <form onSubmit={handleCity}>
                                        <input
                                            type="text"
                                            placeholder="enter city name"
                                            value={newCity}
                                            onChange={handleCityChange}
                                        />
                                    </form>
                                </Box>
                                <Box>
                                    <CurrentLocation
                                        location={weather.name}
                                        temp={(weather.main.temp / 10).toFixed(1)}
                                        handleFavourite={handleFavourites}
                                    />
                                </Box>
                            </Box>
                            <Box className="weatherCondtions">
                                <WeatherConditions
                                    weatherData={weather}
                                />
                            </Box>
                        </>
                        :

                        <div className="loader">
                            <div className="jumping-dots-oader" > <span></span> <span></span> <span></span> </div>
                            <div className="moving-gradient"></div>
                        </div>
                    }

                </Box>
            </div>
        </ThemeProvider>
    )
}

export default Home