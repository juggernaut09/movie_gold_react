import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react'
import axios from "axios";

const Reviews = ({getMovieData, movie, reviews, reviewTexts, setReviews}) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    
    useEffect(() => {
        getMovieData(movieId);
    }, [])

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try{
            const response = await axios.post("http://localhost:8080/api/v1/reviews", {reviewBody:rev.value, imdbId: movieId});
            const updatedReviews = [...reviews, response.data._id];
            rev.value = "";
            setReviews(updatedReviews);
            getMovieData(movieId);
        }
        catch (err) {
            console.log(err);
        }
        
    }
 

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt=""/>
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?"></ReviewForm>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr></hr>
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviewTexts?.map((reviewText) => {
                        return (
                            <>
                                <Row>
                                    <Col>{reviewText}</Col>
                                </Row>
                                <Row>
                                    <Col><hr></hr></Col>
                                </Row>
                            </>
                        )
                    })
                }
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews