import axios from 'axios'

const url = 'http://localhost:5000/posts'

export const fetchPosts = () => axios.get(url)
export const createPost = (newPost) => axios.post(url, newPost)


<<<<<<< HEAD
export const fetchPosts = () => axios.get(url)

=======
>>>>>>> 6f379062f106a131262ff6ef0789707ee961aa34
