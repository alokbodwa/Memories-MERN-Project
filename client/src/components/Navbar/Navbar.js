import React from 'react'
import { AppBar, Typography } from '@material-ui/core';

import memories from '../../images/memories.png'
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories.png" height="60" />
            </AppBar>
        </div>
    )
}

export default Navbar
