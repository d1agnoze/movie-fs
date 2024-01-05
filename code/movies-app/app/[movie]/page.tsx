"use server"

import Movies from "@/interfaces/interfaces"
import request, { gql } from "graphql-request"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { movie: string } }) {
    const getMovie = async (id: number) => {
        const query = gql`
                query Movies($movieId: Int!) {
                    movie(id: $movieId) {
                    Id
                    Release_Date
                    Title
                    Overview
                    Popularity
                    Vote_Count
                    Vote_Average
                    Original_Language
                    Genre
                    Poster_Url
                }
            }
        `
        const data = await request(process.env.GRAPHQL_URL, query, { "movieId": id }).then((res: { movie:  Movies  }) => res.movie).catch((err) => { return notFound() })
        return data
    }
    if (isNaN(Number(params.movie))) return notFound()

    const data = await getMovie(Number(params.movie))

    return <div className="px-5">My sheet: {data.Id}</div>
}