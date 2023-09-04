import { Box } from '@mui/material';
import './CurrentLocation.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useStyles } from '../MuiTheme/styles';


const CurrentLocation = ({ location, temp, handleFavourite }) => {

  const classes = useStyles();

  return (
    <Box className={classes.currentLocationSection}>
      <Box>
        <div className={classes.currentLocation}>
          <h1>{location}</h1>
          <h1>{temp}°C</h1>
        </div>
        <span className={classes.addToFavourites}>
          <FavoriteBorderIcon
            onClick={handleFavourite}
          />
        </span>
      </Box>
    </Box>
  )
}

export default CurrentLocation