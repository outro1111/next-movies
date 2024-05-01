'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function SignupForm() {
	const [name, setName] = useState('') // 입력 된 이름 데이터
  const [email, setEmail] = useState('') // 입력 된 이메일 데이터
  const [password, setPassword] = useState('') // 입력 된 패스워드 데이터
	const [isSignup, setIsSignup] = useState(true) // 회원가입 폼 노출 상태
  const [invalidName, setInvalidName] = useState(false) // 이름 체크 - 입력 된 이름 없을 시 true
  const [invalidEmail, setInvalidEmail] = useState(false) // 이메일 체크 - 이메일 조건 미달 시 true
  const [invalidPassword, setInvalidPassword] = useState(false) // 패스워드 체크 - 패스워드 조건 미달 시 true
  const [disableButton, setDisableButton] = useState(true) // 회원가입 disabled 상태
  const nameInputRef = useRef(null) // 포커스 될 이름 input
  const emailInputRef = useRef(null) // 포커스 될 이메일 input
  const passwordInputRef = useRef(null) // 포커스 될 비밀번호 input

  const validateName = () => { // 정규식 - 이름 입력 여부 체크
    setInvalidName(!/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]{2,12}$/.test(name));
  }

  const validateEmail = () => { // 정규식 - 이메일 체크
    setInvalidEmail(!/^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/.test(email));
  }

  const validatePassword = () => { // 정규식 - 숫자 문자 포함 6~12자리 체크
    setInvalidPassword(!/^[A-Za-z0-9!@#$%^*+=-]{6,12}$/.test(password));
  }

  useEffect(() => { // 입력 필드 변경 시 유효성 검사
    validateName();
    validateEmail();
    validatePassword();
  }, [name, email, password])

  useEffect(() => { // 버튼 활성화 상태 업데이트
    setDisableButton(invalidName || invalidEmail || invalidPassword || !(name && email && password));
  }, [invalidName, invalidEmail, invalidPassword, name, email, password])

	const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": name,
          "email": email,
          "password": password
        }),
      })
      if (!res.ok) {
        throw new Error('회원가입 실패');
      }
      const user = await res.json()
      console.log(res, user);
      setIsSignup(false)
    } catch(error) {
      alert('정확하지 않은 정보 혹은 이미 등록된 사용자입니다. \n다시 입력하여 가입해주세요.')
    }
  };

	return (
    <div className="login">
      {isSignup ?
      <>
        <h2 className="sub_title">회원가입</h2>
        <form>
          <p>
            <input type="text" name="userName" id="userName" ref={nameInputRef} onChange={(e) => setName(e.target.value)} placeholder="이름" />
            <label htmlFor="userName"><span>이름</span></label>
          </p>
          {invalidName && name && <p className="validate_info">이름을 2글자 이상 12글자 이하로 입력해 주세요.</p>}
          <p>
            <input type="email" name="email" id="userEmail" ref={emailInputRef} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
            <label htmlFor="userEmail"><span>이메일</span></label>
          </p>
          {invalidEmail && email &&  <p className="validate_info">이메일 형식에 맞게 입력하세요.</p>}
          <p>
            <input type="password" name="password" id="userPassword" ref={passwordInputRef} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" autoComplete="off" />
            <label htmlFor="userPassword"><span>비밀번호</span></label>
          </p>
          {invalidPassword && password && <p className="validate_info">6~12자 영문 숫자를 사용하세요.</p>}
          <button className="btn primary" onClick={handleSignup} disabled={disableButton}>회원가입</button>
        </form>
      </>
      :
      <>
        <div className="success">
          <p><strong className="name">{name}님</strong> 회원가입을 환영합니다. <span>로그인 후 이용해주세요.</span></p>
          <Link href="/api/auth/signin">
            <button className="btn primary">로그인으로 이동</button>
          </Link>
        </div>
      </>
      }
    </div>
	)
}
