import Image from "next/image"
import Link from "next/link"
import Markdown from 'react-markdown'

async function getMovie() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.API_URL}api/movies?populate=*&sort=publishedAt%3Adesc`)
  // const res = await fetch('https://strapi-movies-production.up.railway.app/api/movies?populate=*&sort=createdAt%3Adesc')
  const json = await res.json()
  const data = json.data
  return data
}

export default async function Movies() {
  const movies = await getMovie()
  return (
    <div className="main_movie">
      <Image src={movies[1].attributes.image.data[1].attributes.url} alt="" width={500} height={300} />
      <div className="feature">
        <h1>Screenplay Now!</h1>
          <Link href={`/movies/${movies[1].id}`}>
            <strong>{movies[1].attributes.title }</strong>
            <em>{movies[1].attributes.titleOriginal}</em>
            <div className="description"><Markdown>{movies[1].attributes.description}</Markdown></div>
          </Link>
      </div>
    </div>
  );
}
