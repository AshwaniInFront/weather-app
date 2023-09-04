import { Box, FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import './SearchLocationForm.css'

const SearchLocationForm = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <FormControl variant="standard" className="search-form">
                <TextField
                    
                    type="search"
                    id="search"
                    label="Search"
                    sx={{ input: { color: 'white',width:'100%' } }}
                />
            </FormControl>
        </Box>
    )
}

export default SearchLocationForm