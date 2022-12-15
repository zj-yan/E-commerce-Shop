import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Logout from './Logout';
import UserInfoDataService from '../../services/userInfo';
import { Link } from 'react-router-dom';

const Signup = ({ setUser }) => {
  const [input, setInput] = useState({ userName: '', password: '' });
  const [errorMessage, seterrorMessage] = React.useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("input = ");
    // console.log(input);
    UserInfoDataService.signUpUser(input)
      .then((response) => {
        console.log('response.data = ' + response.data);
        getuserInfo(input);
      })
      .catch((e) => {
        console.log(e);
        seterrorMessage('User name already exist');
      });
  };

  function getuserInfo(input) {
    UserInfoDataService.getUserInfo(input.userName)
      .then((response) => {
        //console.log("getUserInfo response.data = " + JSON.stringify(response.data));
        setUserInfo(response.data);
        navigate('/profile');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function setUserInfo(data) {
    //console.log("getUserInfo response.data = " + JSON.stringify(data));
    let now = Date.now() / 1000 + 10000;
    var loginData = {
      googleId: data._id,
      name: data.userName,
      exp: now,
    };
    setUser(loginData);
    localStorage.setItem('login', JSON.stringify(loginData));
  }

  return (
    <div className="signup-container">
      <p className="SignUpTitle">Create An Account</p>
      <p className="SignUpp">
        It's quick and easy to set up a The Signal account!
      </p>
      <Container>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            {errorMessage.length > 0 && (
              <div style={{ marginBottom: '10px', color: 'red' }}>
                {errorMessage}
              </div>
            )}
            <div className="input-container">
              <label className="lable">Username </label>
              <input
                className="inputText"
                type="text"
                name="userName"
                required
                onChange={handleInput}
              />
            </div>
            <div className="input-container">
              <label className="lable">Password </label>
              <input
                className="inputPassword"
                type="password"
                name="password"
                required
                onChange={handleInput}
              />
            </div>
            <div className="button-container">
              <button className="button-SIGNUP">Sign up </button>
            </div>
          </form>
        </div>
      </Container>
      <div className="signup-link">
        <p className="lable">Already have an account?</p>
        <Link to={'/login'} className="link">
          Sign In here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
