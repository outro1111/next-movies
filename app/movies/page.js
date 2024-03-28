import MovieList from '../components/MovieList'
import Search from "../components/Search";

export default async function MoviesPage({ searchParams: {title} }) {

  let url = `${process.env.API_URL}/api/movies?populate=*&sort=createdAt%3Adesc`;
  if (title) {
    url += `&filters[$or][0][title][$containsi]=${title}&filters[$or][1][titleOriginal][$containsi]=${title}`;
  }
  const res = await fetch(url, {
    cache: "no-store"
  })
  const json = await res.json()
  const movieList = json.data
  return (
    <>
      <Search />
      <MovieList movieList={movieList} />
    </>
  );
}
