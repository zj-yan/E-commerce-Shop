//This will contain the top-level code for the backend.
//It will connect up our database and data access objects and set up exception handling.

//The first few lines import dependencies. mongodb
//and dotenv are modules you installed in Part 1

import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import ProductsDAO from './dao/productsDAO.js';
import UsersDAO from './dao/userDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import CartDAO from './dao/cartDAO.js';
import OrderDAO from './dao/orderDAO.js';

async function main() {
  //sets up our environment variables with reference to the .env file
  dotenv.config();

  const client = new mongodb.MongoClient(process.env.PRODUCTREVIEWS_DB_URI);
  const port = process.env.PORT || 8000;

  try {
    //Connect toMongoDB server
    await client.connect();
    await ProductsDAO.injectDB(client);
    await UsersDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    await CartDAO.injectDB(client);
    await OrderDAO.injectDB(client);
    

    app.listen(port, () => {
      console.log('Server is running on port: ' + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);
