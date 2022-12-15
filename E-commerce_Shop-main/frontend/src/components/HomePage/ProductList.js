import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ProductCarouset from './ProductCarouset.js';
import ProductDataService from '../../services/product.js';
import Rating from './Rating';

import '../ProductList.css';

const ProductList = () => {
  //useState to set state values
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);

  const retrieveProducts = useCallback(() => {
    // the state value currentPage which determines
    //which set of 20 products it will retrieve.
    ProductDataService.getAll(currentPage)
      .then((response) => {
        let products = response.data.products;
        let current = response.data.page;
        let each = 0;
        if ((current = 0)) {
          each = products.slice(0, 9);
        }
        //console.log(response.data.page);
        setProducts(products.slice(0, 8));
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);

  const retrieveNextPage = useCallback(() => {
    retrieveProducts();
  }, [retrieveProducts]);

  //Retrieve the next page if currentPage value changes
  useEffect(() => {
    retrieveNextPage();
  }, [currentPage, retrieveNextPage]);

  return (
    <div>
      <ProductCarouset />

      <Container className="productList-container">
        <Row xs={1} md={4} className="g-4">
          {products.map((product) => {
            return (
              <Col key={product._id}>
                <Card className="productListCard">
                  <Card.Img
                    className="smallPoster img-thumbnail"
                    variant="top"
                    src={product.image}
                  />
                  <Card.Body>
                    <Card.Title className="productCard-Title">
                      {product.name}
                    </Card.Title>
                    {/* <Card.Text className="productCard-Rated">
                      <Rating
                        value={product.rating}
                        text={`  ${product.numReviews} reviews`}
                      />
                    </Card.Text> */}
                    <Card.Text className="productCard-Price">
                      {`Price: $${product.price}`}
                    </Card.Text>
                    <Link
                      className="productCard-link"
                      to={'/products/' + product._id}>
                      View Detail
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <br />
        <div className="pageChange">
          {currentPage === 0 ? (
            <span></span>
          ) : (
            <Button
              className="PageButton"
              variant="link"
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}>
              Previous {entriesPerPage} Results
            </Button>
          )}
          <span className="pageNumber">Page: {currentPage + 1}</span>
          {currentPage === 2 ? (
            <span></span>
          ) : (
            <Button
              className="PageButton"
              variant="link"
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}>
              Previous {entriesPerPage} Results
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductList;
