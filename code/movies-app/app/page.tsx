import MoviesList from '@/components/movies_list'
import Movies, { Pagination } from '@/interfaces/interfaces'
import request, { gql } from 'graphql-request'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'
interface featureResult {
  Id: string,
  Title: string
  Overview: string
  Poster_Url: string
}
const cfgStart: Pagination = { take: 10, skip: 10 }
async function getFeatured() {
  const getFeatured = gql`
  { featured {
      Id,
      Title
      Overview
      Poster_Url
    }
  }
  `
  const data: featureResult = await request(process.env.GRAPHQL_URL, getFeatured).then((data: { featured: featureResult }) => data.featured)
  return data
}
async function getMovies() {
  const getList = gql`
    query Movies($take: Int!, $skip: Int!) {
      movies(take: $take, skip: $skip) {
        Id
        Release_Date
        Title
        Vote_Average
        Genre
        Poster_Url
      }
    }
  `
  const data: Partial<Movies>[] = await request<Partial<Movies>[]>(process.env.GRAPHQL_URL, getList, { take: 10, skip: 0 }).then((data: any) => data.movies)
  return data
}

export default function Home() {
  const data: featureResult = use(getFeatured())
  const list: Partial<Movies>[] = use(getMovies())

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div data-testid="banner" className="hero h-96 bg-base-200" style={{ backgroundImage: `url(${data.Poster_Url})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content flex-col lg:flex-row">
          <Image priority sizes='100vw' width={200} height={600} alt={`${data.Title} Poster`} src={data.Poster_Url} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{data.Title}</h1>
            <p className="py-6">{data.Overview}</p>
            <Link className="btn btn-primary text-white" href={'/' + data.Id}>Get Started</Link>
          </div>
        </div>
      </div>
      <div className="px-5 mt-8 w-full">
        <MoviesList first_list={list} pagiConfig={cfgStart} api={process.env.GRAPHQL_URL} />
      </div>
    </main>
  )
}
