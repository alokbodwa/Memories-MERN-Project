import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))

    const [postData, setPostdata] = useState({
        title: '', message: '', tags: '', selectedFile: '',
    })

    const post = useSelector((state) => {
        if ( currentId ) {
            const requiredPost = state.posts.find((p) => {
                return p._id === currentId
            })
            return requiredPost
        } else {
            return null
        }
    })

    useEffect(() => {
        if(post){
            setPostdata( post )
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()
        if ( currentId ) {
            dispatch(updatePost(currentId, { ...postData, name : user?.result?.name }))
            clear()
        } else{
            dispatch(createPost({ ...postData, name : user?.result?.name }))
            clear()
        }
    }

    const clear = () => {
        setCurrentId(null)
        setPostdata({ title: '', message: '', tags: '', selectedFile: '' })
    }

    if ( !user?.result?.name ) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create memory and like others memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6" margin="6">{currentId ? 'Updating' : 'Creating'} a Memory</Typography>

                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostdata({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostdata({ ...postData, message: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags - Use Commas to separate"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostdata({ ...postData, tags: e.target.value.split(",") })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostdata({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;
