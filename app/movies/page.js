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
