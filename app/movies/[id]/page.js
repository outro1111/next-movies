import Image from "next/image"

async function getMovieDetail(id) {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  // const res = await fetch(`https://strapi-movies-production.up.railway.app/api/movies/${id}?populate[0]=poster&populate[1]=cast.photo&populate[2]=image`)
  const res = await fetch(`${process.env.API_URL}/api/movies/${id}?populate[0]=poster&populate[1]=cast.photo&populate[2]=image`)
  const json = await res.json()
  const data = json.data
  return data
}

export default async function MovieDetailPage({ params: {id} }) {
  const movie = await getMovieDetail(id)
  const casts = movie.attributes.cast
  const photos = movie.attributes.image.data
  // console.log(id);
  return (
    <>
    <div className="detail_movie">
      {/* {JSON.stringify(movie)} */}
      <div className="detail_top">
        <div className="top_bg">
          <Image src={movie.attributes.image.data[1].attributes.url} alt={movie.attributes.image.data[1].attributes.alternativeText} width={500} height={300} />
        </div>
        <div className="top_con">
          <h2 className="title">{movie.attributes.title}</h2>
          <h2 className="titleOriginal">{movie.attributes.titleOriginal}</h2>
          <p className="genre">{movie.attributes.genre}</p>
          <p className="openingDate">{movie.attributes.openingDate}</p>
        </div>
        {/* <p className="average" v-if="average"><span>{{ (average).toFixed(1) }}</span></p> <!-- 리뷰 평균 점수 toFixed로 소수점 처리 --> */}
      </div>

      <div className="detail_con">
        <div className="description">
          <h2 className="detail_title">Storyline</h2>
          <p>{movie.attributes.description}</p>
        </div>
        <div className="poster">
          <Image src={movie.attributes.poster.data.attributes.formats.medium.url} alt={movie.attributes.poster.data.attributes.alternativeText} width={500} height={300} />
        </div>

        <div className="cast">
          <h2 className="detail_title">Cast</h2>
          <ul>
            {casts.map((cast) => (
              <li key={cast.id}>
                <p className="photo">
                  <Image src={cast.photo.data.attributes.url} alt={cast.photo.data.attributes.alternativeText} width={500} height={300} />
                </p>
                <p className="name">{cast.name}</p>
                <p className="role">{cast.role}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="photos">
          <h2 className="detail_title">Photos</h2>
          <ul>
            {photos.map((photo) => (
              <li key={photo.id}>
                <Image src={photo.attributes.formats.medium.url} alt={photo.attributes.alternativeText} width={500} height={300} />
              </li>
            ))}
          </ul>
        </div>
      
        {/* <div className="reviews">
          <h2 className="detail_title">Reviews</h2>
        </div> */}
      </div>

    </div>
    </>
  );
}