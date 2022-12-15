import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import ProductDataService from '../../services/product';

import '../HomePage.css';

//This file is for main page ProductCarouset component:
//It will display high rated product in that area(Top 3)

const ProductCarouset = () => {
  const [products, setProducts] = useState([]);

  const getTopProducts = useCallback(() => {
    ProductDataService.getAll()
      .then((response) => {
        //console.log(response.data.products);
        //console.log(response.data.page);

        let topProducts = response.data.products;
        topProducts.sort((a, b) => {
          return b.rating - a.rating;
        });
        topProducts = topProducts.slice(0, 3);
        //console.log(topProducts);
        setProducts(topProducts);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getTopProducts();
  }, [getTopProducts]);

  return (
    <div>
      <Container className="ProductCarouset">
        <Carousel className="main-container" variant="dark">
          {products.map((product) => {
            return (
              <Carousel.Item key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <img
                    className="carouset_img"
                    src={product.image}
                    alt={product.name}
                  />
                  <Carousel.Caption className="carouset_text">
                    <h5>{product.name}</h5>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Container>
    </div>
  );
};

export default ProductCarouset;
