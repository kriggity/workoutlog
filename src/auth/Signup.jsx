import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default function Signup(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = event => {
        event.preventDefault();
        fetch('http://localhost:3001/api/user/', {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
                .then(response => response.json())
                .then(data => props.updateToken(data.sessionToken))
        })
    }

    return (
        <div>
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='username'>Username</Label>
                    <Input onChange={e => setUserName(e.target.value)} name="username" value={username}></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input type="password" onChange={e => setPassword(e.target.value)} name="password" value={password}></Input>
                </FormGroup>
                <Button type='submit'>Signup</Button>
            </Form>
        </div>
    );
}