// styles.js
import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles((theme) => ({
    divContainer: {
        textAlign: 'center',
        border: `5px solid ${theme.palette.primary.main}`,
        width: '500px',
        height: '400px',
        marginLeft: '1rem',
        padding: '1rem',
        fontSize: '1.2rem',
        color: theme.palette.text.primary,
    },
    customButton: {
        width: '15rem',
        height: '2rem',
        borderRadius: '10px',
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.background.default,
        fontSize: '1.5rem',
        padding: '2px',
        marginLeft: '1rem',
    },
}));
