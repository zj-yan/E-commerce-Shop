import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import ProductList from './components/HomePage/ProductList';
import Product from './components/ProductDetail/Product';
import Cart from './components/ShoppingCart/Cart';
import Login from './components/User/Login';
import Profile from './components/User/Profile';
import Signup from './components/User/Signup';
import AddReview from './components/ProductDetail/AddReview';
import NavbarContent from './components/HomePage/NavBarContent';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CartDataService from './services/cart';
import ProductDataService from './services/product';
import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem('login'));
    console.log('loginData = ');
    console.log(loginData);
    if (loginData) {
      let loginExp = loginData.exp;
      console.log('loginExp = ' + loginData.exp);
      let now = Date.now() / 1000;

      if (now < loginExp) {
        setUser(loginData);
      } else {
        // Expired
        console.log('loginData Expired');
        localStorage.setItem('login', null);
      }
    }
  }, []);

  

  useEffect(() => {
    console.log('user changed!');
    console.log(user);
  }, [user]);



  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="webPage">
        <NavbarContent user={user} />
        <Routes>
          <Route exact path={'/'} element={<ProductList user={user} />} />
          <Route exact path="/login" element={<Login setUser={setUser} />} />
          <Route
            exact
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route exact path="/signup" element={<Signup setUser={setUser} />} />
          <Route
            exact
            path={'/products'}
            element={<ProductList user={user} />}
          />

          <Route exact path="/cart" element={<Cart user={user} />} />

          <Route path={'/products/:id'} element={<Product user={user} />} />
          <Route
            path={'/products/:id/review'}
            element={<AddReview user={user} />}
          />
        </Routes>

        <footer className="footer">
          <Container>
            <Row>
              <Col className="text-center py-3">
                Copyright &copy; The Signal
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
