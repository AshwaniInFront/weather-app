import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './AddToFavourites.css'


const AddToFavourites = () => {

  const [newitems, setNewItems] = useState([])

  const removeFavourites = (favoriteId) => {

    console.log(favoriteId,'favoriteId')
    const updatedFavorites = newitems.filter((fav) => fav.id !== favoriteId);
    setNewItems(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }


  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const newitems = JSON.parse(storedFavorites)
      setNewItems(newitems);
    }
  }, [])
  


  return (
    <Box style={{ color: '#FFF' }}>
      <div className="favourite-wrapper">
      {newitems.map(item => {
        return (
          <>
            <div className="favourite-block" key={item.id}>
              <div className="favourite-title">
                {item.weatherName}
              </div>
              <div className="favourite-temp">
                {item.weatherTemp}
              </div>
              <div className="favourite-title">
                <FavoriteBorderIcon />
              </div>
              <div className="remove-favourites">
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => removeFavourites(item.id)} 
                >
                  remove from favourites
                </Button>
              </div>
            </div>

          </>
        )
      })}
    </div>
    </Box >
  )
}

export default AddToFavourites