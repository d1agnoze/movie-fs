"use client"
import React, { useState } from "react";
import Movies, { Pagination } from './../interfaces/interfaces';
import request, { gql } from "graphql-request";
import InfiniteScroll from "react-infinite-scroll-component";
import Movie from "./movie";
import toast from "react-hot-toast";
const MoviesList = ({ first_list, pagiConfig, api }: { first_list: Partial<Movies>[], pagiConfig: Pagination, api: string }) => {
    const [state, setState] = useState<paginateScroll>({ items: first_list, hasMore: true })
    const [cfg, setCfg] = useState<Pagination>(pagiConfig)
    const fetchMore = async () => {
        setCfg({ ...cfg, skip: cfg.skip + cfg.take })
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
        const data: Partial<Movies>[] = await request<Partial<Movies>[]>(api, getList, { take: cfg.take, skip: cfg.skip }).then((data: any) => data.movies)
        setState({
            items: [...state.items, ...data],
            hasMore: data.length > 0
        })
    }
    return <InfiniteScroll
        dataLength={state.items.length}
        next={fetchMore}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'flex-start', paddingTop: '2rem' }}
        hasMore={state.hasMore}
        data-testid="list"
        loader={<div className="grid w-full place-items-center"><span className="loading loading-dots loading-md"></span></div>}
        >
        {state.items.map((i, index) => <Movie item={i} key={index} />)}
    </InfiniteScroll>
}

export default MoviesList;
interface paginateScroll {
    items: Partial<Movies>[]
    hasMore: boolean
}


