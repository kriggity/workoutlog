import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default function Login(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        fetch('http://localhost:3001/api/user/signin', {
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
        })
            .then(response => response.json())
            .then(data => props.updateToken(data.sessionToken))
    }
    return (
        <div>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='username'>Username</Label>
                    <Input name="username" value={username} onChange={e => setUserName(e.target.value)}></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}></Input>
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
        </div>
    );
}