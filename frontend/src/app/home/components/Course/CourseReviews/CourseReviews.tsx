import styles from "./CourseReviews.module.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function CourseReviews({ course, pgnumber }) {
  const [reviews, setReviews] = useState([]); // Inicialize reviews como um estado

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/displayreviews/recents/${course.code}/1`
        );
        if (response.status === 200) {
          const reviewsData = await response.json();
          setReviews(reviewsData); // Atualize o estado de reviews com os dados da resposta
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [course.code]); // Fetch reviews whenever the course code changes

  if (reviews.length === 0)
    return (
      <p className="NoReviewsFound">
        Oops... parece que não há mais reviews disponíveis
      </p>
    );
  else
    return (
      <>
        <ul className="list-group">
          {reviews.map((review) => (
            <li className="singlereview" key={review.id}>
              <div className="row">
                <div className="col-10 reviewuser">{review.user}</div>
                <div className="col-2 reviewdate text-center">
                  {review.date}
                </div>
              </div>
              <div className="row">
                <div className="col-10 reviewcomment ">{review.comment}</div>
                <div className="col-2 reviewgrade text-center">
                  {review.grade}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
}

export default CourseReviews;