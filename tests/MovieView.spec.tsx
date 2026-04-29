import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Movie } from "../src/interfaces/movie";
import { MovieView } from "../src/components/MovieView";

describe("MovieView Component", () => {
    const movie: Movie = {
        id: "test-movie",
        title: "Test Movie",
        rating: 8,
        description: "This is a test movie.",
        released: 2022,
        soundtrack: [{ id: "song1", name: "Song One", by: "Artist" }],
        watched: { seen: false, liked: false, when: null },
    };

    const mockDeleteMovie = jest.fn();
    const mockEditMovie = jest.fn();
    const mockSetMovieWatched = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders movie title, description, and release year", () => {
        render(
            <MovieView
                movie={movie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        expect(screen.getByText("Test Movie")).toBeInTheDocument();
        expect(screen.getByText("This is a test movie.")).toBeInTheDocument();
        expect(screen.getByText(/Released 2022/i)).toBeInTheDocument();
    });

    test("calls setMovieWatched with movie id when watched button is clicked", () => {
        render(
            <MovieView
                movie={movie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        const watchedButton = screen.getByRole("button", {
            name: /mark as watched/i,
        });
        userEvent.click(watchedButton);

        expect(mockSetMovieWatched).toHaveBeenCalledWith(movie.id, true, false);
    });

    test("shows the MovieEditor form after clicking Edit", () => {
        render(
            <MovieView
                movie={movie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        userEvent.click(screen.getByRole("button", { name: /edit/i }));

        expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
        expect(screen.getAllByLabelText(/Release Year:/i).length).toBeGreaterThan(0);
    });
});
