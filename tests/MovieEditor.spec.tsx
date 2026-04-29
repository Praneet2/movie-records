import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("MovieEditor Component", () => {
    const mockMovie: Movie = {
        id: "test-movie-123",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
        watched: {
            seen: true,
            liked: true,
            when: "2023-01-01",
        },
    };

    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );
    });

    test("renders MovieEditor with the movie title", () => {
        expect(screen.getByDisplayValue("The Test Movie")).toBeInTheDocument();
    });

    test("saves updated movie title and calls changeEditing", () => {
        const titleInput = screen.getByLabelText(/Title:/i);
        userEvent.clear(titleInput);
        userEvent.type(titleInput, "Updated Title");

        userEvent.click(screen.getByRole("button", { name: /save/i }));

        expect(mockEditMovie).toHaveBeenCalledTimes(1);
        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("calls changeEditing when Cancel is clicked", () => {
        userEvent.click(screen.getByRole("button", { name: /cancel/i }));

        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
        expect(mockEditMovie).not.toHaveBeenCalled();
        expect(mockDeleteMovie).not.toHaveBeenCalled();
    });

    test("calls deleteMovie with the movie id when Delete is clicked", () => {
        userEvent.click(screen.getByRole("button", { name: /delete/i }));

        expect(mockDeleteMovie).toHaveBeenCalledWith(mockMovie.id);
        expect(mockChangeEditing).not.toHaveBeenCalled();
    });
});
