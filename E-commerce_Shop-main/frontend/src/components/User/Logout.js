import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './profile.css';
function Logout({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout(); // helper for logging out
    setUser(null);
    localStorage.setItem('login', null); // clearing local storage
    console.log('Logout made successfully');
    navigate('/');
  };

  return (
    <div>
      <div className="logoutP">
        <Button variant="light" class="logoutButton" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Logout;
