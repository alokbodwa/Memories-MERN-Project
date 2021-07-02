import React, { useState } from 'react'
import { Avatar, Button, TextField, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import { spacing } from '@material-ui/system'

import useStyles from './Styles';
import Input from './Input'




const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false);
    

    const handleSubmit = () => {
     
    };
    const handleChange = () => {

    }

    const handleShowPassword = () => {
        return setShowPassword((prevState) => !prevState);
    }

    const switchMode = () => {
        return setIsSignUp((prevState) => !prevState)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName" label=" First Name" handleChange={handleChange} autoFocus ></Input>
                                <Input name="lastName" label=" Last Name" handleChange={handleChange} ></Input>
                            </>
                        )}
                        <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Log In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} >
                                {isSignUp ? 'ALREADY HAVE AN ACCOUNT!! SIGN IN' : "DON'T HAVE AN ACCOUNT!! SIGN UP"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth
