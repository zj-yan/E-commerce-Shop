//This will be where our server code will reside.
//This is where the Express framework will be put to use.
import express from 'express';
import cors from 'cors';
import products from './api/products.route.js';
import reviews from './api/products.route.js';
import userInfo from './api/user.route.js';
import cart from './api/cart.route.js';
import order from './api/order.route.js';
const app = express();

//The .use() method on an Express app adds various
//functionality in the form of what is called "middleware".
app.use(cors());
app.use(express.json());

app.use('/api/v1/products', products);
app.use('/api/v1/products/review', reviews);
app.use('/api/v1/user', userInfo);
app.use('/api/v1/cart', cart);
app.use('/api/v1/order', order);

app.use('*', (req, res) => {
  res.status(404).json({ error: 'not found' });
});

export default app;
