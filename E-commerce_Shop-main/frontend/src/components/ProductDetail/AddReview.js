import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ProductDataService from "../../services/product";

const AddReview = ({ user }) => {
  const navigate = useNavigate();
  const params = useParams();

  let editing = false;
  let initialReviewState = "";
  const location = useLocation();

  //initialReviewState will have different value
  //if we editing an existing review
  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.review;
    console.log(initialReviewState);
  }

  const [review, setReview] = useState(initialReviewState);

  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };
  console.log(user);
  const saveReview = () => {
    var data = {
      review: review,
      name: user.name,
      user_id: user.googleId,
      product_id: params.id, //get product id from url
    };

    if (editing) {
      //editing an existing review.
      data.review_id = location.state.currentReview._id;
      ProductDataService.updateReview(data)
        .then((response) => {
          console.log(response.data);
          navigate("/products/" + params.id);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      //creating a new review
      ProductDataService.createReview(data)
        .then((response) => {
          console.log(response.data);
          navigate("/products/" + params.id);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Container className='main-container'>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>{editing ? "Edit" : "Create"} Review </Form.Label>
          <Form.Control
            as='textarea'
            type='text'
            required
            review={review}
            onChange={onChangeReview}
            defaultValue={editing ? initialReviewState : ""}
          />
        </Form.Group>
        <Button variant='primary' onClick={saveReview}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddReview;
