import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography , Avatar, Toolbar, Button} from '@material-ui/core';

import memories from '../../images/memories.png'
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles();
    const user = null;
    return (
        
            <AppBar className={classes.appBar} position="static" color="inherit">
              <div className={classes.brandContainer}>
              <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories.png" height="60" />
              </div>
              <toolbar className={classes.toolbar}>
                  {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charArt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.nsme}</Typography>
                        <button variant="contained" className={classes.logout} color="secondary">Logout</button>
                    </div>
                  ) : (
                    <button component={Link} to ="/Auth" variant="contained" color="primary">Sign In</button>
                  )}
              </toolbar>
            </AppBar>
        
    );
};

export default Navbar;
