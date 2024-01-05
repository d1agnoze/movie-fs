import '@testing-library/jest-dom'
import { render, screen, } from '@testing-library/react'
import Movie from '@/components/movie'
import Movies from '@/interfaces/interfaces'

describe('Page', () => {
    it('renders the movie', async () => {
        const item: Partial<Movies> = {
            Id: 1,
            Release_Date: "2031-2",
            Title: "Tekken Bloodlines",
            Vote_Average: 9.2,
            Genre: "Action",
            Poster_Url: "https://m.media-amazon.com/images/M/MV5BYzQyYThmN2EtYmEyZi00N2IzLWEwYWItMGE0YzM2MDYwMjVhXkEyXkFqcGdeQXVyMTUzOTcyODA5._V1_.jpg"
        }
        render(<Movie item={item} />)

        const heading = screen.getByRole('heading', { level: 2 })
        const button = screen.getByRole('link')
        expect(heading).toBeInTheDocument()
        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('href', "/" + item.Id)
    })
})