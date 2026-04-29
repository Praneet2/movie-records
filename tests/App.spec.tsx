import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("App Component", () => {
    test("renders the app header", () => {
        render(<App />);
        expect(screen.getByText(/Movie Records/i)).toBeInTheDocument();
    });

    test("opens the add movie modal", () => {
        render(<App />);

        userEvent.click(screen.getByRole("button", { name: /add new movie/i }));

        expect(screen.getByLabelText(/YouTube ID/i)).toBeInTheDocument();
    });

    test("closes the add movie modal after saving", () => {
        render(<App />);

        userEvent.click(screen.getByRole("button", { name: /add new movie/i }));
        userEvent.type(
            screen.getByLabelText(/YouTube ID/i),
            "unique-movie-id-123",
        );
        userEvent.click(screen.getByRole("button", { name: /save changes/i }));

        expect(screen.queryByLabelText(/YouTube ID/i)).not.toBeInTheDocument();
    });
});
