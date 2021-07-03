import React, { useState } from 'react'
import { Avatar, Button, TextField, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import useStyles from './Styles';
import Input from './Input'
import Icon from './Icon'
import { signin, signup } from "../../actions/auth";



const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};


const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);


     const handleSubmit = (e) => {
       e.preventDefault();
       if (isSignUp) {
          dispatch(signup(formData, history));
        } else {
          dispatch(signin(formData, history));
        }
     };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]:e.target.value});
    };

    const handleShowPassword = () => {
        return setShowPassword((prevState) => !prevState);
    }

    const switchMode = () => {
        setIsSignUp((prevState) => !prevState);
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        // ?. doesn't throw error, even if an object is undefined
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: 'AUTH', data: { result, token } })

            history.push('/')
        } catch (e) {
            console.log(e.message)
        }

    }
    const googleFailure = () => {
        console.log("unsuccessful sign in")
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
                        {isSignUp ? (
                            <>
                                <Input name="firstName" label=" First Name" handleChange={handleChange} autoFocus ></Input>
                                <Input name="lastName" label=" Last Name" handleChange={handleChange} ></Input>
                            </>
                        ) : null}
                        <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Log In'}
                    </Button>
                    <GoogleLogin
                        clientId="21408845707-s5lrku0als4ouo83rhvro8bi9plfelv9.apps.googleusercontent.com"
                        // need not be the same name (render)
                        render={(renderProps) => (
                            <Button className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                // disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

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
