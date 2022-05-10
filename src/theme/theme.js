import {createTheme} from "@mui/material";

export const palette = {
    white: '#ffffff',
    one: '#d8ebf2',
    two: '#4ea6d8',
    three: '#0555ae',
    four: '#000d51',
    black: '#152836',
    dark: '#050811',
    green: '#06d6a0',
    yellow: '#FFD700',
    red: '#FF0000',
    orange: '#ee6c4d',
    grey: '#617485',
    chartBG: '#ffffff'
}

const pagination_buttons = {
    props: {
        variant: 'pagination'
    },
    style: {
        backgroundColor: palette.white,
        cursor: 'pointer',
        color: 'black',
        height: '100%',
        ":hover": {
            backgroundColor: 'cornflowerblue'
        }
    }
}

const user_button_edit = {
    props: {
        variant: 'userEdit'
    },
    style: {
        backgroundColor: palette.two,
        cursor: 'pointer',
        color: 'black',
        height: '100%',
        textTransform: 'capitalize',
        fontSize: '15px',
        ":hover": {
            backgroundColor: palette.green
        },
        "&:disabled": {
            backgroundColor: palette.grey,
        }
    }
}

const user_button_delete = {
    props: {
        variant: 'userDelete'
    },
    style: {
        backgroundColor: palette.one,
        cursor: 'pointer',
        color: 'black',
        height: '100%',
        textTransform: 'capitalize',
        fontSize: '15px',
        ":hover": {
            backgroundColor: palette.yellow
        }
    }
}

const paper_for_user = {
    props: {
        variant: 'user'
    },
    style: {

    }
}

const filter_button_clear = {
    props: {
        variant: 'clear'
    },
    style: {
        backgroundColor: palette.orange,
        textTransform: 'capitalize',
        height: '50px',
        width: '150px',
        fontSize: '15px',
        color: 'white',
        ":hover": {
            backgroundColor: palette.red
        }
    }
}

export const theme = createTheme({
    components: {
        MuiButton: {
            variants: [
                pagination_buttons,
                user_button_edit,
                user_button_delete,
                filter_button_clear
            ]
        },
        MuiPaper: {
            variants: [
                paper_for_user
            ]
        }
    },
    palette: palette
});
