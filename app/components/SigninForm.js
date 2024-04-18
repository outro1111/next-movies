
'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SigninForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    // const res = await signIn("credentials", {
    signIn("credentials", {
      email,
      password,
      // redirect: true,
      callbackUrl: "/",
    });
    // console.log('res', res)
    // return res
  }

  return (
    // <form method="post" onSubmit={handleSubmit}>
    <form>
      <div className="login">
        <p>
          <input type="email" name="email" id="userEmail" onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
          <label htmlFor="userEmail"><span>이메일</span></label>
        </p>
        <p>
          <input type="password" name="password" id="userPassword" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
          <label htmlFor="userPassword"><span>비밀번호</span></label>
        </p>
        <button className="btn primary" onClick={handleSubmit}>Sign in</button>
        {/* <button className="btn primary" type="submit">Sign in</button> */}
      </div>
    </form>
  )
}
