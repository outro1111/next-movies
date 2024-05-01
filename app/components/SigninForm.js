
'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function  SigninForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("credentials", {
      email, // 사용자가 입력한 이메일
      password, // 사용자가 입력한 패스워드
      // redirect: true,
      callbackUrl: sessionStorage.getItem("prevUrl") || "/" // 주소로 리다이렉트
    })
    .catch((error) => {
      alert('아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.')
      console.error(error);
    })
  }

  return (
    // <form method="post" onSubmit={handleSubmit}>
    <form>
      <div className="login">
        <h2 className="sub_title">로그인</h2>
        <p>
          <input type="email" name="email" id="userEmail" onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
          <label htmlFor="userEmail"><span>이메일</span></label>
        </p>
        <p>
          <input type="password" name="password" id="userPassword" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
          <label htmlFor="userPassword"><span>비밀번호</span></label>
        </p>
        <button className="btn primary" onClick={handleSubmit}>로그인</button>
        <div className="btn_signup">회원이 아니시라면 <Link href="/api/auth/signup">회원가입</Link> 을 해주세요.</div>
      </div>
    </form>
  )
}
