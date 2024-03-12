import Link from "next/link"
import Image from "next/image"
import Markdown from 'react-markdown'

async function movieList() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch('https://strapi-movies-production.up.railway.app/api/movies?populate=*&sort=publishedAt%3Adesc')
  const json = await res.json()
  const data = json.data
  return data
}

export default async function Movies() {
  const movies = await movieList()
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
