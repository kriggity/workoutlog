import React, { useState, useEffect } from 'react';
import './App.css';
import Sitebar from './home/NavBar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

export default function App() {

  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} /> : <Auth updateToken={updateToken} />);

  return (
    <div>
      <Sitebar clickLogout={clearToken} />
      {protectedViews()}
      {/* <WorkoutIndex /> */}
    </div>
  );
}