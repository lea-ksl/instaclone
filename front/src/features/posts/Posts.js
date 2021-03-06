import React from "react";
import fire from '../../fire.js';
import {Box, Button, Text, TextInput} from "grommet";
import {Refresh, Favorite} from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import {addPost, getPosts, addLike} from "../../services/postsServices";

import { useSelector, useDispatch } from 'react-redux';
import {
update, selectPosts
} from './postsSlice';


const Posts = () => {

    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();

    const user = fire.auth().currentUser;
    const userEmail = user.email;

    const [content, setcontent] =React.useState();
    const likes = 0;
    const [refresh, setrefresh] = React.useState(true);

    const publish = (e) => {
        e.preventDefault();
        
        if (content){
            addPost(content, likes).then(()=>setrefresh(true))
        }
    }

    React.useEffect(() => {

        const fecthPosts = async () => {
            const fetchData = await getPosts();
            //setposts(fetchData);
            dispatch(update(fetchData));
        }
        if (refresh) {
            fecthPosts();
            setrefresh(false);
        }
        
    }, [refresh])


    return(
        <Box fill align="center" justify="center" background="dark-2">
        <Box align="center">
            <Box direction="row" gap="small">
                <TextInput placeholder="content" onChange={(e)=> setcontent(e.target.value)} />
                <Button label="publier" onClick={(e)=> publish(e)}/>
            </Box>
            <Button icon={<Refresh />} onClick={()=> setrefresh(true)}/>
            <Card 
            round="medium" 
            padding="medium" 
            justify="center"
            align="center"
            margin="medium"
            width="medium"
            height="auto">
                {posts ? 
                posts.map(post => (
                    <CardConcave align="center"
                    justify="center"
                    round="small"
                    padding="medium"
                    margin="medium"
                    width="medium">
                        <Text>{post.content} {userEmail}</Text>
                        <Button 
                        icon={<Favorite /> }onClick={()=> addLike(post.id, post.likes)} />
                        <Text>{post.likes} likes</Text>
                    </CardConcave>
                ))

                 : 
                <Text>Ceci sont les posts</Text>
                }
            </Card>
            
        </Box>
        <Button label="sign out" onClick={()=> fire.auth().signOut()} />
        </Box>
    )
}

export default Posts;