import MovieList from '../components/MovieList'
import Search from "../components/Search";

export default function MoviesPage({ searchParams: {title} }) {
  return (
    <>
      <Search />
      <MovieList title={title} />
    </>
  );
}

export const metadata = {
  title: "영화 리스트 | MovieRevue",
  description: "MovieRevue 영화 리스트",
}
