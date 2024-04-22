'use client';
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link"

export default function LoginMenu() {
  const { data: session } = useSession();
  const [userOpen, setUserOpen] = useState(false);

  const handleLoginRedirect = () => { // 로그인 후 이전 페이지로 리다이렉트 
    sessionStorage.setItem("prevUrl", window.location.href); // 세션 스토로지에 현재 URL 저장
  };

  const logoutAfter = () => { // 로그아웃 후 얼랏 노출
    alert('로그아웃 되었습니다.')
  }

  if (session) {
    return (
      <div className="login_area login_is">
        <button className="btn_login" onClick={() => setUserOpen(!userOpen)}>
          <em><span className="sr_only">Login Info</span></em>
          <span className="arrow"></span>
        </button>
        {userOpen && (
          <div className={`user_layer ${userOpen ? 'active' : ''}`} onClick={() => setUserOpen(false)}>
            <div className="user_layer_in"></div>
            <p className="user_info">
              <span className="name">{session.user.username}</span>
              <span className="email">{session.user.email}</span>
            </p>
            <p className="btn_area">
              <button onClick={() => { signOut(), logoutAfter() }} className="btn_logout">
                <span className="icon"></span>Logout
              </button>
            </p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="login_area">
        <Link href="/api/auth/signin" onClick={handleLoginRedirect} className="btn_login">
            <em><span className="sr_only">Login</span></em>
        </Link>
      </div>
    );
  }
}