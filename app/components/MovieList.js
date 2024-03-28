import Link from "next/link"
import Image from "next/image"
import Markdown from 'react-markdown'

const movieList = async (title) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  let url = `${process.env.API_URL}/api/movies?populate=*&sort=createdAt%3Adesc`;
  if (title) {
    url += `&filters[$or][0][title][$containsi]=${title}&filters[$or][1][titleOriginal][$containsi]=${title}`;
  }
  const res = await fetch(url, {
    cache: "no-store"
  })
  const json = await res.json()
  const data = json.data
  return data
}

export default async function MovieList(props) {
  const title = props.title
  const movies = await movieList(title)
  return (
    <ul className="list">
      {/* {JSON.stringify(movies)} */}
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>
            <div className="thumb">
              <Image src={movie.attributes.image.data[0].attributes.formats.medium.url} alt={movie.attributes.image.data[0].attributes.alternativeText} width={500} height={300} />
            </div>
            <h2 className="title">{ movie.attributes.title }</h2>
            <h2 className="titleOriginal">{ movie.attributes.titleOriginal }</h2>
            
            <div className="description"><Markdown>{movie.attributes.description}</Markdown></div>
            <div className="info">
              <span className="genre">{ movie.attributes.genre }</span>
              <span className="openingDate">{ movie.attributes.openingDate }</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}


// async function movieList() {
// await new Promise((resolve) => setTimeout(resolve, 5000))
//   const res = await fetch('https://strapi-movies-production.up.railway.app/api/movies?populate=*');
//   const json = await res.json();
//   return json;
// }

// export default async function Home() {
//   const movie = await movieList();
//   return (
//     <div>{JSON.stringify(movie)}</div>
//   );
// }
