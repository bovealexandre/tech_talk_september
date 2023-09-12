import Image from 'next/image'

async function getData() {
  const res = await fetch('http://localhost:8000/')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()
  return (
    <main className="flex min-h-screen flex-row flex-wrap items-center justify-between px-24">
      {data.title.map((i: string, index: number) => (
          <div key={index} className='w-5/12 m-2 flex flex-col items-center'>
            <img src={data.image[index]} alt={i}/>
            <span>{i}</span>
            <p>{data.synopsis[index]}</p>
            <a href={data.links[index]}>go to movie</a>
          </div>
        )
      )}
    </main>
  )
}
