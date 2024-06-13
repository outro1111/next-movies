import { Suspense } from 'react';
import MovieList from './components/MovieList'
import MainMovie from './components/MainMovie'

export default function HomePage({ searchParams: {title} }) {
  return (
    <>
      <MainMovie />
      <MovieList title={title} showPagination={false} />
      {/* <Suspense fallback={<p className="nodata">검색 결과가 없습니다.</p>}>
        <MovieList />
      </Suspense> */}
    </>
  );
}

export const metadata = {
  title: "Home | MovieRevue",
  description: "MovieRevue Homepage",
  openGraph: {
    title: 'MovieRevue',
    description: 'MovieRevue Homepage',
  },
}