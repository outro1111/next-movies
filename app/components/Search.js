'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Form() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('title', term);
    } else {
      params.delete('title');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="list_search">
      <input
          placeholder="영화 제목 검색"
          onChange={(event) => handleSearch(event.target.value)}
          defaultValue={searchParams.get("title") || ''}
      />
    </div>
  )
}
