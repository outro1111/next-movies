import Link from "next/link"
import Image from "next/image"
import Logo from "../../public/images/logo_w.svg"

export default function Navbar() {
  return (
    <header id="header">
      <h1>
      <Link href="/">
        {/* <Image src={Logo} width="auto" alt="MovieRevue" /> */}
      </Link>
      </h1>
      <nav>
        <ul>
          <li><Link href="/">LIST</Link></li>
          <li><Link href="/">ABOUT</Link></li>
        </ul>
      </nav>
      <div className="util">
      {/* <movieSearch /> <!-- 검색 버튼 -->
      <darkMode /> <!-- 다크 모드 버튼 -->
      <langMenu />  <!-- 언어 설정 버튼 -->
      <LoginMenu />  <!-- 로그인 버튼 --> */}
      </div>
    </header>
  );
}