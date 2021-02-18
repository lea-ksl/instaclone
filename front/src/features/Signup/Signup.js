import React, {useCallback} from 'react';

import { Box, TextInput, Text, Button } from 'grommet';

import fire from '../../fire';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState();

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
       
        const result = await fire.auth().createUserWithEmailAndPassword(email, password)
            //history.push("/")
            .catch((error) => {
                setError('error');
            })
            console.log(result);
     });
    return (

        
        <Box fill align="center" justify="center" background="back" gap="small">
            Inscriptions

            <Box width="small" gap="small">
                <TextInput type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
                <TextInput type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            </Box>
            {error && 
                <Text margin="small" color="red">{error}</Text>
            }
            <Button label="S'inscrire" onClick={(e) => handleSignUp(e)} />

        </Box>
    )
}

export default Signup;