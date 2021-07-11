import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: {
        type: String
    },
    message: {
        type: String
    },
    creator: {
        type: String
    },
    name :{
        type: String
    },
    tags: {
        type: [String],
        default: []
    },
    selectedFile: {
        type: String
    },
    likeCount: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
console.log (new Date())

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage
