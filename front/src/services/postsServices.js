import axios from "axios";

import fire from '../fire';

const url = 'http://localhost:3001/posts'

const createToken = async () => {

    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());

    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };

    return payloadHeader;
}

export const addPost = async (content, like) => {
    const header = await createToken();
    console.log(content)
    const payload ={
        content,
        like
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
    
}

export const getLikes = async id => {
    const user = await fire.auth().currentUser;
    const header = await createToken();
    try {
        const res = await axios.get(`${url}/${id}`,header)
    return res.data
    } catch (e) {
        console.error(e);
    }
    
}


export const addLike = async (id,like) => {
    const header = await createToken();
    const ids = await getLikes(id);
    const payload = {
        like
    }

    try {
        const res = await axios.put(`${url}/${id}`,payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
    
}

export const getPosts = async () => {
    const header = await createToken();

    try {
        const res = await axios.get(url, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}
