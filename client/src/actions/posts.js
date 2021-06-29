import * as api from '../api'

export const getPosts = () => async(dispatch) => {

    try{
        const { data } = await api.fetchPosts()
        const action = { type: 'FETCH_ALL', payload: data }
        dispatch(action) 

    } catch(e){
        console.log(e.message)
    }

}

export const createPost = ( post ) => async(dispatch) => {
    try{
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data })
    } catch(e){
        console.log(e.message)
    }
}

export const updatePost = ( currentId, postData ) => async(dispatch) => {
    try{
        const { data } = await api.updatePost(currentId, postData)
        dispatch({ type: 'UPDATE', payload: data })
    } catch(e) {
            console.log(e.message)
    }
}

export const deletePost = ( currentId ) => async(dispatch) => {
    try{
        await api.deletePost(currentId)
        dispatch({ type: 'DELETE', payload: currentId })
    } catch(e) {
            console.log(e.message)
    }
}

