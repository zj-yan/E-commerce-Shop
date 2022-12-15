# Project Name: MERN E-commerce Shop Website

## Project GitHub Link :

https://github.ccs.neu.edu/NEU-CS5610-SU22/E-commerce_Shop

## Project Deploy Link :

- FrontEnd Heroku Link:https://e-commerce-shop-frontend.herokuapp.com/
- BackEnd Heroku Link:https://e-commerce-shop-backend.herokuapp.com/api/v1/products

## 1. Creators

- Shiyu Huang：Home Page
- Fangtong Zhao：Product Details Page
- Zhijie Yang：Shopping Cart Page
- Yucen Cao：User Registration page; User Account Page

## 2. Project Description

An E-commerce website platform that allows customers to purchase products, look through their order details, and post reviews.

## 3. Functions:

### Iteration 1:

- HomePage:(Shiyu Huang)

  - NavBar:
    - Search Button: key word search for certain product.
    - Other buttons take users to the respective page.
      ![GitHub Logo](/InfoImg/NavBar.png)
  - ProductCarouset:
    - Show top 3 rating products of the store.
      ![GitHub Logo](/InfoImg/ProductCarouset.png)
  - ProductList:
    - Each page has a display of 8 products.
    - View detail button take user to corresponding product detail page.
      ![GitHub Logo](/InfoImg/ProductList.png)

- User Registration page:(Yucen Cao)

  - Register/Login/Logout user Account

    ![GitHub Logo](/InfoImg/Login.png)

- Product Details Page:(Fangtong Zhao)

  - Product information:
    - add to cart button: link to cart.
    - Other buttons details information for the product.
      ![GitHub Logo](InfoImg/ProductDetails.png)

- Shopping Cart Page:(Zhijie Yang)

  - Order items and choose quantities:

    - Quantities button allow user to add or remove current porduct
      <img width="731" alt="Screen Shot 2022-08-10 at 3 34 49 PM" src="https://media.github.ccs.neu.edu/user/11148/files/1f897343-3c4e-4419-aa2c-026d9a3b9506">

  - Get order total prices:
    - Summary box showed total prices for the porduct
    - Check out button integrated paypal third party library
      <img width="549" alt="Screen Shot 2022-08-10 at 3 34 52 PM" src="https://media.github.ccs.neu.edu/user/11148/files/37ce74af-8472-467d-b82d-f2523dce9f76">

### Iteration 2:

- Shiyu Huang：

  - style product detail page
  - write function to pass data from productList page to detail page
  - for search result, link detail product page to the search product.
  - update style shopping cart
  - when user login, connect home page login button with user login profile
  - update review backend. make it work
  - add PayPal library and function for the project
    ![GitHub Logo](/InfoImg/shoppingCart.png)
    ![GitHub Logo](/InfoImg/paypal.png)

- Fangtong Zhao:
  - Added a review function which allows users to add, edit, delete review.
  - Users can post reviews after logging in, otherwise only display existing reviews.
  - Styled review part of product detail page.
    ![GitHub Logo](/InfoImg/review.png)
- Zhijie Yang：

  - Add retrieval data service for cart page
  - Add style for shopping cart
  - <img width="1396" alt="Screen Shot 2022-08-10 at 3 43 40 PM" src="https://media.github.ccs.neu.edu/user/11148/files/e55db0fd-3451-4da6-bcfd-2b915b6be13d">

- Yucen Cao：
  - Implement back-end APIs for profile management/login/register
  - Implement frontend for register

### Iteration 3:

- Shiyu Huang：
  - add function for basket item display
  - add product to basket function
  - deploy frontend/backend
  - user Login/Register page style
    ![GitHub Logo](/InfoImg/LoginStyle.png)
    ![GitHub Logo](/InfoImg/Signup.png)
  - user profile page style
    ![GitHub Logo](/InfoImg/ProfileOrder.png)

- Fangtong Zhao:
  - Added contact information
  - Styled user profile page
  
    ![GitHub Logo](/InfoImg/profile-css.png)
- Zhijie Yang：

  - Modify quantity button for adding and removing items
  - Add submit order option for final order reviewal
  - Correct shopping cart product display

-  Yucen Cao：
   -  Write backend for add product to cart
   -  Write backend for get product to display in basket 
   -  Write backend for get order history
   -  Update front end for profile

## 4. Libraries:

- PayPal Library for shopping cart payment
- MUI Icons for all Icon in the project.
  - https://mui.com/material-ui/material-icons/
# E-commerce-Shop
