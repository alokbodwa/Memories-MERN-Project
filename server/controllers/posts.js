import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    }catch(e){
        res.status(404).send({ message: e.message })
    }
}

export const createPost = async(req, res) => {
    const post = req.body 
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try{
        await newPost.save()
        res.status(201).json(newPost)
    } catch(e){
        res.status(409).send({ message: e.message })
    }
}
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags, likeCount } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, likeCount, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }
    try{
        await PostMessage.findByIdAndDelete({ _id: id })
        res.json({ message: 'Post deleted Successfully' })
    } catch(e){
        console.log(e)
    }
    
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    
    if ( !req.userId ) {
        return res.json({ message: 'Unauthenticated' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }

    const post = await PostMessage.findById(id)

    const index = post.likeCount.findIndex((id) => {
        return id === String(req.userId)
    })
    if ( index === -1){
        post.likeCount.push(req.userId)
    } else{
        post.likeCount = post.likeCount.filter((likeId) => {
            return likeId !== req.userId
        })
    }
    
    try{
        const updatedPost = await PostMessage.findByIdAndUpdate( id, post, { new: true })
        res.json(updatedPost)
    } catch(e){
        console.log(e)
    }
    
}


