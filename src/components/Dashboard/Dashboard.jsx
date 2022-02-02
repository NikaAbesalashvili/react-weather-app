import { useState } from 'react';

import { 
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Tooltip
}
from "@material-ui/core";
import { Search } from "@material-ui/icons"; 
import useStyles from './style';
import axios from 'axios';

const initialState = {
    cityName: ''
}

const inputProps = {
    inputProps: {
        style: {
            textAlign: 'center',
            fontSize: '1.5rem'
        },
    }
};

const Dashboard = () => {
    
    const classes = useStyles();
    const [city, setCity] = useState(initialState);
    const [cityWeather, setCityWeather] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [unit, setUnit] = useState('kelvin');

    const getWeatherData = async () => {

        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city.cityName}&appid=${process.env.REACT_APP_API_KEY}`

        try {
            const result = await axios.get(URL);
            console.log('HERE');
            if(result.status === 200) {
                const { main, weather } = result.data;
            
                setCityWeather(weather[0]);
                setWeatherData(main);
            }else{
                throw new Error('Something went wrong');
            };
        } catch (error) {
            // console.log(error.response.status);
            console.log('ERROR');
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        setUnit('kelvin');

        getWeatherData();

    };

    const handleChange = (event) => {
        setCity({ ...city, [event.target.name]: event.target.value });
        setWeatherData(null);
    };

    const convertTemperature = (temperature) => {
        if(unit === 'celsius') temperature -= 273.15;
        else if(unit === 'pharenheit') temperature = (temperature - 273.15) * 9 / 5 + 32;

        return temperature.toFixed(2);
    };

    const handleRadioChange = (event) => {
        setUnit(event.target.value);
    };

    return (
        <Container component='main' maxWidth='xl' >
            <Paper className={classes.paper} elevation={3} >
                <form className={classes.form} onSubmit={handleSubmit} >
                    <TextField name='cityName' className={classes.searchField} onChange={handleChange} InputProps={inputProps} />
                    <Button type='submit' >
                        <Search color='primary' />
                    </Button>
                </form>

                {!weatherData ? <CircularProgress /> : (
                    <Container >
                        <Container className={classes.weatherContainer} >
                            <Typography variant='h4' >{city.cityName}</Typography>
                            <Tooltip title={cityWeather.description} >
                                <Typography variant='h5' className={classes.weatherMain} >
                                    {cityWeather.main}
                                </Typography>
                            </Tooltip>
                        </Container>

                        <Container className={classes.infoBox} >
                            <Container className={classes.typos} >
                                <Typography className={classes.temperatureInfo} variant='h5' >
                                    Temperature: {convertTemperature(weatherData.temp)}
                                </Typography>
                                <Typography className={classes.temperatureInfo} variant='h5' >
                                    Feels Like: {convertTemperature(weatherData.feels_like)}
                                </Typography>
                                <Typography className={classes.temperatureInfo} variant='h5' >
                                    Max Temperature: {convertTemperature(weatherData.temp_max)}
                                </Typography>
                                <Typography className={classes.temperatureInfo} variant='h5' >
                                    Min Temperature: {convertTemperature(weatherData.temp_min)}
                                </Typography>
                            </Container>

                            <Container className={classes.radios}  maxWidth='xs' >
                                <FormControl className={classes.radioButtons} >
                                    <FormLabel id='unit-radio-buttons-group' >Unit</FormLabel>
                                    <RadioGroup
                                        aria-labelledby='unit-radio-buttons-group'
                                        defaultValue='kelvin'
                                        name='unit-buttons-group'
                                        onChange={handleRadioChange}
                                    >
                                        <FormControlLabel value='kelvin' control={<Radio color='primary' />} label='Kelvin' />
                                        <FormControlLabel value='celsius' control={<Radio color='primary' />} label='Celsius' />
                                        <FormControlLabel value='pharenheit' control={<Radio color='primary' />} label='Pharenheit' />
                                    </RadioGroup>
                                </FormControl>
                            </Container>
                        </Container>
                    </Container>
                )}
            </Paper>
        </Container>
    );
};

export default Dashboard;
