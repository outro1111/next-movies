import Image from "next/image"
import Markdown from 'react-markdown'

async function getMovie() {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  // const res = await fetch(`${process.env.API_URL}/api/movies?populate=*&sort=publishedAt%3Adesc`)
  const res = await fetch('https://strapi-movies-production.up.railway.app/api/movies?populate=*&sort=publishedAt%3Adesc')
  const json = await res.json()
  const data = json.data
  return data
}

export default async function Movies() {
  const movies = await getMovie()
  return (
    <div className="main_movie">
      <Image src={movies[0].attributes.image.data[1].attributes.url} alt="" width={500} height={300} />
      <div className="feature">
        <h1>Screenplay Now!</h1>
        <strong>{movies[0].attributes.title }</strong>
        <em>{movies[0].attributes.titleOriginal}</em>
        <div className="description"><Markdown>{movies[0].attributes.description}</Markdown></div>
      </div>
    </div>
  );
}
