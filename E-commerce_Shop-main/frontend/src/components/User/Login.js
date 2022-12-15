import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserInfoDataService from '../../services/userInfo';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login({ setUser }) {
  const [input, setInput] = useState({ userName: '', password: '' });
  const [errorMessage, seterrorMessage] = React.useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSuccess = (res) => {
    var tokenData = jwt_decode(res.credential);
    var loginData = {
      googleId: tokenData.sub,
      ...tokenData,
    };
    console.log('Login Success');
    //console.log('currentUser:', loginData);
    setUser(loginData);
    localStorage.setItem('login', JSON.stringify(loginData));
    //go to profile
    // console.log('Navigate To');
    navigate('/profile');
  };

  const onFailure = (res) => {
    console.log('Login failed: res', res);
  };

  let checkResult = null;
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('Login user(handleSubmit)= ' + JSON.stringify(input));

    let myPromise = new Promise(function (myResolve, myReject) {
      UserInfoDataService.loginCheck(input.userName, input.password)
        .then((response) => {
          //console.log("response.data = " + response.data);
          checkResult = response.data;
          if (checkResult === true) {
            myResolve('True');
          } else {
            myReject('Password is wrong');
          }
        })
        .catch((e) => {
          //console.log(e);
          myReject('Sorry. The user not in the database');
        });
    });

    myPromise.then(
      function (value) {
        UserInfoDataService.getUserInfo(input.userName)
          .then((response) => {
            //console.log("getUserInfo response.data = " + JSON.stringify(response.data));
            setUserInfo(response.data);
            navigate('/profile');
          })
          .catch((e) => {
            console.log(e);
          });
      },
      function (error) {
        console.log('error: ' + error);
        seterrorMessage(error);
      }
    );

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
  };

  return (
    <div className="login-container">
      <p className="bigTitle"> Two Ways Login</p>
      <Row>
        <Col>
          <Container>
            <p className="SignUpTitle">Sign In</p>
            <p className="SignUpp">
              Sign in so you can add items to your shopping cart, track your
              orders, and checkout faster!
            </p>

            <div className="login-form">
              <form onSubmit={handleSubmit}>
                {errorMessage.length > 0 && (
                  <div className="error">{errorMessage}</div>
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
                  <button className="button-SIGNUP">Sign In </button>
                </div>
              </form>
            </div>
          </Container>

          <div className="signup-link">
            <p className="lable">Don't have an account?</p>
            <Link to={'/signup'} className="link">
              Sign up here
            </Link>
          </div>
        </Col>
        <Col>
          <p className="googleTitle">Google Account Login</p>
          <div className="googleLogin-link">
            <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              auto_select={true}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
