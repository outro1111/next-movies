import Link from "next/link"
import Image from "next/image"
import Pagination from "./Pagination";

export default async function MovieList({title, page = 1, pageSize = 3, showPagination = true}) {
  let url = `${process.env.API_URL}/api/movies?populate=*&sort=createdAt%3Adesc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  if (title) {
    url += `&filters[$or][0][title][$containsi]=${title}&filters[$or][1][titleOriginal][$containsi]=${title}`;
  }
  const res = await fetch(url, {
    cache: "no-store"
  })
  const json = await res.json()
  const movies = json.data
  const totalPages = json.meta.pagination.pageCount;

  return (
    <>
    <h2 className="sub_title">Movies</h2>
    { title && movies.length >0  ?  
      <div className="search_result">
        <strong>&lsquo;{ title }&rsquo;</strong> 에 대한 검색 결과가
        <strong>&lsquo;{ movies.length }&rsquo;</strong> 개 있습니다.
      </div>
      :
      null
    }
    { movies.length ? 
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`} prefetch={true}>
              <div className="thumb">
                <Image src={movie.attributes.image.data[0].attributes.formats.medium.url} alt={movie.attributes.image.data[0].attributes.alternativeText} width={500} height={300} />
              </div>
              <h2 className="title">{ movie.attributes.title }</h2>
              <h2 className="titleOriginal">{ movie.attributes.titleOriginal }</h2>
              <div className="description">{movie.attributes.description}</div>
              <div className="info">
                <span className="genre">{ movie.attributes.genre }</span>
                <span className="openingDate">{ movie.attributes.openingDate }</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      :
      <p className="nodata">검색 결과가 없습니다.</p>
    }
    {showPagination && (
      <Pagination page={page} totalPages={totalPages} />
    )}
    </>
  );
}
