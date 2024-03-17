import MovieList from '../components/MovieList'

export default function MoviesPage({ searchParams: {title} }) {
  return (
    <>
      <MovieList title={title} />
    </>
  );
}
