"use client"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function ReviewList(props) {
  const router = useRouter();
  // const [isLogin, setIsLogin] = useState(false);
  // const [reviewId, setReviewId] = useState(0);
  // const [isEdit, setIsEdit] = useState(false);
  // const textareaRef = useRef(null);

  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState('');
  const [reviewRating, setReviewRating] = useState(1);
  
  // 리뷰 리스트 불러오기
  useEffect(() => {
    setReviews(props.reviews.data)
  }, [props.reviews]);

  const catchRating = (rate) => {
    setReviewRating(rate * 2)
  }

  // 리뷰 작성
  const fnReviewPost = async (e) => {
    e.preventDefault()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
          cache: "no-store",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // JSON 형태로 데이터 전송을 명시
          },
          body: JSON.stringify({
            "data": {
              "movie": props.param,
              "content": reviewInput,
              "rating": reviewRating,
              "user": null
            }
          })
        });
        if (res.status >= 200 && res.status < 300) {
          // const newReview = await res.json();
          // setReviews(prevReviews => [...prevReviews, newReview.data]);
          console.log(props.param, props.getReviews(props.param));
          await props.getReviews(props.param)
          // alert('리뷰가 등록되었습니다.')
          router.refresh();
        }
    }catch(error){
        console.log(error);
        return {}
    }
  }

  return (
    <form onSubmit={fnReviewPost}>
      <div className="reviews">
        <h2 className="detail_title">Reviews</h2>
        <textarea
          className="review_input"
          rows="5"
          value={reviewInput}
          onChange={(e) => setReviewInput(e.target.value)}
          // ref={textareaRef}
          placeholder="감상평을 등록해주세요.">
        </textarea>

        <div className="review_write">
          <div className="star_rating">
            <span className="number">{reviewRating}</span>
            <Rating onClick={catchRating} initialValue={reviewRating / 2} fillColor="red" size="min(max(18px, 2.8em), 26px)" allowFraction="true" />
          </div>
          <button type="submit" className="btn primary">리뷰작성</button>
        </div>

        <div className="review_list">
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p className="rating">{review.attributes.rating}</p>
                  {/* <p className="name">{review.attributes.user.data.attributes.username}</p> */}
                  <p className="review">{review.attributes.content}</p>
                  <p className="review_date">{review.attributes.publishedAt}</p>
                  <div className="btn_right">
                    {/* {review.attributes.user.data.id === currentUser && (
                      <>
                        <button className="btn sub" onClick={() => handleGetView(review.id)}>수정</button>
                        <button className="btn sub" onClick={() => handleDelete(review.id)}>삭제</button>
                      </>
                    )} */}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="nodata">첫번째 리뷰를 남겨주세요.</p>
          )}
        </div>
      </div>
    </form>
  );
}