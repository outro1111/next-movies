import { Suspense } from 'react';
import MovieList from './components/MovieList'
import MainMovie from './components/MainMovie'

export default function HomePage({ searchParams: {title} }) {
  return (
    <>
      <MainMovie />
      {/* <MovieList title={title} /> */}
      {/* <Suspense fallback={<p className="nodata">검색 결과가 없습니다.</p>}>
        <MovieList />
      </Suspense> */}
    </>
  );
}
