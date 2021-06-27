import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find()
        console.log(postMessages)
        res.status(200).json(postMessages)
    }catch(e){
        res.status(404).send({ message: e.message })
    }
}

export const createPost = async(req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    try{
        await newPost.save()
        res.status(201).send(newPost)
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
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
