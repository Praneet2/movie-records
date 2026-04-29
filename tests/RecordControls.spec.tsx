import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecordControls } from "../src/components/RecordControls";

describe("RecordControls Component", () => {
    test("shows Mark as watched when the movie is not seen", () => {
        const setMovieWatched = jest.fn();
        const changeEditing = jest.fn();

        render(
            <RecordControls
                watched={{ seen: false, liked: false, when: null }}
                setMovieWatched={setMovieWatched}
                changeEditing={changeEditing}
            />,
        );

        expect(
            screen.getByRole("button", { name: /mark as watched/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /edit/i }),
        ).toBeInTheDocument();
    });

    test("calls setMovieWatched(true, false) when Mark as watched is clicked", () => {
        const setMovieWatched = jest.fn();
        const changeEditing = jest.fn();

        render(
            <RecordControls
                watched={{ seen: false, liked: false, when: null }}
                setMovieWatched={setMovieWatched}
                changeEditing={changeEditing}
            />,
        );

        userEvent.click(
            screen.getByRole("button", { name: /mark as watched/i }),
        );

        expect(setMovieWatched).toHaveBeenCalledWith(true, false);
        expect(changeEditing).not.toHaveBeenCalled();
    });

    test("shows Mark as unwatched and Not liked when the movie is seen and not liked", () => {
        const setMovieWatched = jest.fn();
        const changeEditing = jest.fn();

        render(
            <RecordControls
                watched={{ seen: true, liked: false, when: "2025-01-01" }}
                setMovieWatched={setMovieWatched}
                changeEditing={changeEditing}
            />,
        );

        expect(
            screen.getByRole("button", { name: /mark as unwatched/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /not liked/i }),
        ).toBeInTheDocument();
    });

    test("calls setMovieWatched(true, true) when Not liked is clicked", () => {
        const setMovieWatched = jest.fn();
        const changeEditing = jest.fn();

        render(
            <RecordControls
                watched={{ seen: true, liked: false, when: "2025-01-01" }}
                setMovieWatched={setMovieWatched}
                changeEditing={changeEditing}
            />,
        );

        userEvent.click(screen.getByRole("button", { name: /not liked/i }));

        expect(setMovieWatched).toHaveBeenCalledWith(true, true);
    });

    test("calls changeEditing when Edit is clicked", () => {
        const setMovieWatched = jest.fn();
        const changeEditing = jest.fn();

        render(
            <RecordControls
                watched={{ seen: true, liked: true, when: "2025-01-01" }}
                setMovieWatched={setMovieWatched}
                changeEditing={changeEditing}
            />,
        );

        userEvent.click(screen.getByRole("button", { name: /edit/i }));

        expect(changeEditing).toHaveBeenCalledTimes(1);
        expect(setMovieWatched).not.toHaveBeenCalled();
    });
});
