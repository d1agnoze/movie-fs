"use client"

import Movies from "@/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const Movie = ({ item }: { item: Partial<Movies> }) => {
    return <>{
        <div className="indicator w-60">
            <span className="indicator-item badge badge-info text-white">⭐{item.Vote_Average}</span>
            <div className="card w-full bg-base-100 shadow-xl">
                <figure><Image placeholder='blur' blurDataURL={item.Poster_Url} width={0} height={0} sizes="100vw" loading='lazy' alt={`${item.Title} Poster`} src={item.Poster_Url} style={{ objectFit: 'cover', borderRadius: '10px', width: '100%' }} /></figure>
                <div className="card-body pt-3">
                    <h2 className="card-title">{item.Title}</h2>
                    <p className="text-sm">{item.Release_Date}</p>
                    <div className="flex gap-2 flex-wrap text-sm">{item.Genre.split(",").map(genre => <div className="badge badge-sm badge-accent badge-outline text-sm" key={genre.trim()}>{genre.trim()}</div>)}</div>
                    <div className="card-actions mt-2 justify-end"><Link className="btn btn-secondary" href={`/${item.Id}`}>Git to page</Link></div>
                </div>
            </div>
        </div>
        || <Skeleton />
    }</>;
}

export default Movie;