import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddMovieModal } from "../src/components/AddMovieModal";

describe("AddMovieModal Component", () => {
    const mockHandleClose = jest.fn();
    const mockAddMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("does not render modal content when show is false", () => {
        render(
            <AddMovieModal
                show={false}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />,
        );

        expect(screen.queryByText("Add New Movie")).not.toBeInTheDocument();
    });

    test("renders modal content when show is true", () => {
        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />,
        );

        expect(screen.getByText("Add New Movie")).toBeInTheDocument();
        expect(screen.getByLabelText(/YouTube ID/i)).toBeInTheDocument();
        expect(screen.getByText(/Spotify IDs/i)).toBeInTheDocument();
    });

    test("allows entering a YouTube ID", () => {
        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />,
        );

        const youtubeIdInput = screen.getByLabelText(/YouTube ID/i);
        userEvent.type(youtubeIdInput, "dQw4w9WgXcQ");

        expect(youtubeIdInput).toHaveValue("dQw4w9WgXcQ");
    });

    test("calls handleClose when Close button is clicked", () => {
        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />,
        );

        const closeButtons = screen.getAllByRole("button", { name: /close/i });
        userEvent.click(closeButtons[closeButtons.length - 1]);

        expect(mockHandleClose).toHaveBeenCalledTimes(1);
        expect(mockAddMovie).not.toHaveBeenCalled();
    });

    test("calls addMovie and then closes when Save Changes is clicked", () => {
        render(
            <AddMovieModal
                show={true}
                handleClose={mockHandleClose}
                addMovie={mockAddMovie}
            />,
        );

        const youtubeIdInput = screen.getByLabelText(/YouTube ID/i);
        userEvent.type(youtubeIdInput, "test-video-id");
        userEvent.click(screen.getByRole("button", { name: /save changes/i }));

        expect(mockAddMovie).toHaveBeenCalledTimes(1);
        expect(mockAddMovie).toHaveBeenCalledWith(
            expect.objectContaining({ id: "test-video-id" }),
        );
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });
});
