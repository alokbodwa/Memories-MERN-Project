import React from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import memories from './images/memories.png'

const App = () => {
    return (
        <Container maxwidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">Memories</Typography>
                <img src={memories} alt="memories.png" height="360" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid>

                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App