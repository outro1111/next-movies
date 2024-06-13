import MovieList from '../components/MovieList'
import Search from "../components/Search";

export default function MoviesPage({ searchParams: {title, page, pageSize, pageCount} }) {
  return (
    <>
      <Search />
      <MovieList title={title} page={page} pageSize={pageSize} pageCount={pageCount} showPagination={true} />
    </>
  );
}

export const metadata = {
  title: "영화 리스트 | MovieRevue",
  description: "MovieRevue 영화 리스트",
}
