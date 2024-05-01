"use client"
import { useEffect, useState } from "react";

export default function AverageRating({reviews}) {
  // 평균 점수 계산
  const [averageRating, setAverageRating] = useState(false);
  let reviewSum = 0;
  reviews.data.forEach(review => {
    reviewSum += review.attributes.rating;
  });

  useEffect(() => {
    setAverageRating(reviewSum / reviews.data.length)
  }, [reviews]);

  return (
    averageRating ? (<p className="average"><span>{(averageRating).toFixed(1)}</span></p>) : <p className="average"><span>..</span></p>
  );
}