import Search from "../components/Search";

export default function Home({ searchParams }) {
  return (
    <>
      <h1>Live Params</h1>
      <Search />
      <p>Current Param: {searchParams.query}</p>
    </>
  );
}
