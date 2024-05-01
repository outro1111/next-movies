import Markdown from "react-markdown"

export const metadata = {
  title: "About | MovieRevue",
  description: "MovieRevue About",
}

const getAbout = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await fetch(`${process.env.API_URL}/api/about-us`, {
    cache: "no-store"
  })
  const json = await res.json()
  const data = json.data
  return data
}

export default async function AboutPage() {
  const about = await getAbout()
  return (
    <>
      <Markdown>{about.attributes.content}</Markdown>
    </>
  )
}
