import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        background: 'rgba( 255, 255, 255, 0.45 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 7px )',
        borderRadius: '10px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )'
    },

    form: {
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '1rem',
    },

    searchField: {
        width: '80%',
        textAlign: 'center',
    },

    infoBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0'
    },

    typos: {
        paddingLeft: '0',
    },

    temperatureInfo: {
        marginBottom: '1.3rem',
        fontSize: '1.1em'
    },

    weatherContainer: {
        width: '100%',
        padding: '0 0 1.5rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    weatherMain: {
        textAlign: 'right',
    },

    radios: {
        width: '30%',
        paddingLeft: '0',
        margin: '0',
    },

    radioButtons: {
        display: 'flex',
        flexDirection: 'center',
    },

    [theme.breakpoints.down('xs')]: {
        infoBox: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },

        radios: {
            width: '100%',
        },

        weatherContainer: {
            paddingBottom: '2rem'
        }
    }
}));
