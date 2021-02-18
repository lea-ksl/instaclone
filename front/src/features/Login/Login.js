import React from 'react';
import { Link } from 'react-router-dom';

import { Box, TextInput, Text, Button } from 'grommet';

import fire from '../../fire';

const Login = () => {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [error, setError] = React.useState();


    const handleSummit = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            setError('error');
        })
    }

    return (

        
        <Box fill align="center" justify="center" background="back" gap="small">
            Login

            <Box width="small" gap="small">
                <TextInput type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
                <TextInput type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            </Box>
            {error && 
                <Text margin="small" color="red">{error}</Text>
            }
            <Button label="Se connecter" onClick={(e) => handleSummit(e)} />
            <Box>Pas encore de compte ? <Link color='#ffffff' to="/signup">Signup</Link></Box>
        </Box>
    )
}

export default Login;