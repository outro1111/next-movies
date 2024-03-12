import { Suspense } from 'react';
import MovieList from './components/MovieList'
import MainMovie from './components/MainMovie'

export default function Home() {
  return (
    <>
      <MainMovie />
      <MovieList />
      {/* <Suspense fallback={<p className="nodata">검색 결과가 없습니다.</p>}>
        <MovieList />
      </Suspense> */}
    </>
  );
}
