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
    <input
        style={{border:"1px solid black", margin:"40px 40px 0", fontSize:"20px"}}
        placeholder="test"
        onChange={(event) => handleSearch(event.target.value)}
        defaultValue={searchParams.get("title") || ''}
    />
  )
}
