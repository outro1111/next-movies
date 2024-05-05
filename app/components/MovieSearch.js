"use client"
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';


export default function MovieSearch() {
  const router = useRouter()
  const [movieSearch, setMovieSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const searchInput = useRef(null);

  const fnIsSearch = () => {
    setIsSearch(!isSearch);
    setMovieSearch('');
    if (searchInput.current) {
      searchInput.current.focus();
    }
  };

  const fnSearch = () => {
    if (movieSearch !== '') {
      router.push(`/movies?title=${movieSearch}`);
      // router.push({
      //   pathname: '/movies',
      //   query: { title: movieSearch }
      // });
      setIsSearch(!isSearch);
    }
  };

  return (
    <div className={`search_area ${isSearch ? 'active' : ''}`}>
      <div className="search_in" onClick={fnIsSearch}></div>
      <div className="search_form">
        <input
          type="text"
          className="search_input"
          ref={searchInput}
          value={movieSearch}
          onChange={(e) => setMovieSearch(e.target.value.trim())}
          onKeyUp={(e) => e.key === 'Enter' && fnSearch()}
          placeholder="영화 제목 검색"
        />
        <button className="btn_search" onClick={fnSearch}>
          <span className="sr_only">Search</span>
        </button>
      </div>
      
      <button className="btn_search" onClick={fnIsSearch}>
        <span className="sr_only">Toggle Search</span>
      </button>
    </div>
  );
}
