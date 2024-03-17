"use client"
import { usePathname } from 'next/navigation';
import Link from "next/link"
import Image from "next/image"
import Logob from "../../public/images/logo_b.svg"
import Logow from "../../public/images/logo_w.svg"
import MovieSearch from "./MovieSearch";

export default function Navbar() {
  const pathname = usePathname()
  const isActive = (href) => pathname === href;
  console.log(pathname);

  return (
    <header id="header" className={isActive("/") ? "main": ""}>
      <h1>
      <Link href="/">
        <Image src={Logob} width="auto" alt="MovieRevue" />
      </Link>
      </h1>
      <nav>
        <ul>
          <li><Link href="/movies" className={isActive("/movies") ? "active": ""}>LIST</Link></li>
          <li><Link href="/" className={isActive("/about") ? "active": ""}>ABOUT</Link></li>
        </ul>
      </nav>
      <div className="util">
        <MovieSearch /> {/* 검색 버튼 */}
        {/* <darkMode /> 다크 모드 버튼 */}
        {/* <langMenu />  언어 설정 버튼 */}
        {/* <LoginMenu />  로그인 버튼 */}
      </div>
    </header>
  );
}