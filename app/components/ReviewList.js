"use client"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useFormatDate } from "../utils/useFormatDate"

export default function ReviewList(props) {
  const router = useRouter(); // 라우터 가져오기
  const [reviews, setReviews] = useState([]); // 리뷰 리스트 데이터
  const [reviewInput, setReviewInput] = useState(''); // 리뷰 input 데이터
  const [reviewRating, setReviewRating] = useState(1); // 리뷰 점수 데이터
  const [putId, setPutId] = useState(0); // 수정할 리뷰 영화 id
  const [isEdit, setIsEdit] = useState(false); // 수정 상태
  const textareaRef = useRef(null); // 포커스를 위한 textarea ref 참조
  const {formatDateHour} = useFormatDate() // 리뷰 날짜 포맷팅
  
  // 리뷰 리스트 불러오기
  useEffect(() => {
    setReviews(props.reviews.data) // props로 받은 리뷰 리스트 출력
  }, [props.reviews]);

  const catchRating = (rate) => { // Star 클릭 한 리뷰 점수 2배로 설정 5 -> 10 
    setReviewRating(rate * 2)
  }

  // 리뷰 글쓰기 textarea 여러 줄 높이 자동 조절
  const autoHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '75px'; // 기본 높이를 설정합니다.
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 5}px`; // 내용에 따라 높이를 조절합니다.
    }
  };
  // 컴포넌트가 마운트될 때 autoHeight 함수를 실행, reviewInput(teaxarea value) 값 변경 시 실행
  useEffect(() => {
    autoHeight();
  }, [reviewInput]);

  // 리뷰 작성
  const fnReviewPost = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
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
          alert('리뷰가 등록되었습니다.')
          setReviewInput('') // 리뷰 textarea 값 초기화
          setReviewRating('1') // 리뷰 점수 1점으로 초기화
          router.refresh()
        }
    }catch(error){
        console.log(error);
        return {}
    }
  }

  // 리뷰 삭제
  const fnReviewDelete = async (id) => {
    if(confirm('삭제하시겠습니까?')) { 
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`, {
        method: 'DELETE',
        // headers: {
        //   // 'Authorization': `Bearer ${userToken}` // 토큰을 headers에 담아 전달
        // }
      })
    }
    router.refresh()
  }

  // 리뷰 수정 시 해당 데이터 가져오기
  const fnReviewGetView = async (id) => {
    try {
      const res = await fetch(`${process.env.API_URL}/api/reviews/${id}`, {
        cache: "no-store",
      });
      const json = await res.json()
      const data = json.data
      setReviewInput(data.attributes.content) // 리뷰 textarea 수정 값으로 설정
      setReviewRating(data.attributes.rating) // 리뷰 점수 수정 값으로 설정
      setIsEdit(true) // 리뷰 수정 상태로 설정
      setPutId(id) // 해당 리뷰의 영화 id 값으로 설정
      textareaRef.current.focus(); // textarea 포커스
    }catch(error){
      console.log(error);
    }
  }

  // 리뷰 수정
  const fnReviewUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${putId}`, {
        method: 'PUT',
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
        alert('리뷰가 수정되었습니다.')
        setReviewInput('') // 리뷰 textarea 값 초기화
        setReviewRating('1') // 리뷰 점수 1점으로 초기화
        setIsEdit(false) // 리뷰 수정 전 상태로 전환
        router.refresh()
      }
    }catch(error){
        console.log(error);
        return {}
    }
  }

  // 리뷰 수정 취소
  const fnReviewCancel = async () => {
    setReviewInput('') // 리뷰 textarea 값 초기화
    setReviewRating('1')// 리뷰 점수 1점으로 초기화
    setIsEdit(false) // 리뷰 수정 전 상태로 전환
  }

  return (
    <div className="reviews">
      <h2 className="detail_title">Reviews</h2>
      <textarea
        className="review_input"
        rows="5"
        value={reviewInput}
        onChange={(e) => setReviewInput(e.target.value)}
        ref={textareaRef}
        placeholder="감상평을 등록해주세요.">
      </textarea>

      <div className="review_write">
        <div className="star_rating">
          <span className="number">{reviewRating}</span>
          <Rating onClick={catchRating} initialValue={reviewRating / 2} fillColor="red" size="min(max(18px, 2.8em), 26px)" allowFraction="true" />
        </div>
        {isEdit ? (
          <div className="btn_update">
            <button className="btn primary" onClick={fnReviewUpdate}>리뷰수정</button>
            <button className="btn primary" onClick={fnReviewCancel}>취소</button>
          </div>
        ) : (
          <button className="btn primary" onClick={fnReviewPost}>리뷰작성</button>
        )}
      </div>

      <div className="review_list">
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p className="rating">{review.attributes.rating}</p>
                {/* <p className="name">{review.attributes.user.data.attributes.username}</p> */}
                <p className="review">{review.attributes.content}</p>
                <p className="review_date">{ formatDateHour(review.attributes.createdAt)}</p>
                <div className="btn_right">
                  {/* {review.attributes.user.data.id === currentUser && (
                    <> */}
                      <button className="btn sub" onClick={() => fnReviewGetView(review.id)}>수정</button>
                      <button className="btn sub" onClick={() => fnReviewDelete(review.id)}>삭제</button>
                    {/* </>
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
  );
}