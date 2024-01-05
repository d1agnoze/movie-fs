export default interface Movies {
    Id: number,
    Release_Date: string,
    Title: string,
    Overview: string,
    Popularity: number,
    Vote_Count: number,
    Vote_Average: number,
    Original_Language: string,
    Genre: string,
    Poster_Url: string,
}
export interface Pagination {
    take: number
    skip: number
}