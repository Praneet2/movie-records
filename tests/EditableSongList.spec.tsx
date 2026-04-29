import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditableSongList } from "../src/components/EditableSongList";

describe("EditableSongList Component", () => {
    const mockSetSongs = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders existing songs and the add button", () => {
        render(
            <EditableSongList
                songs={["song-1", "song-2"]}
                setSongs={mockSetSongs}
            />,
        );

        expect(
            screen.getByRole("button", { name: /add song/i }),
        ).toBeInTheDocument();

        const songInputs = screen.getAllByRole("textbox");
        expect(songInputs[0]).toHaveValue("song-1");
        expect(songInputs[1]).toHaveValue("song-2");
    });

    test("adds a blank song when Add Song is clicked", () => {
        render(<EditableSongList songs={[]} setSongs={mockSetSongs} />);

        userEvent.click(screen.getByRole("button", { name: /add song/i }));

        expect(mockSetSongs).toHaveBeenCalledWith([""]);
    });

    test("updates a song when the input changes", () => {
        render(
            <EditableSongList songs={["first-song"]} setSongs={mockSetSongs} />,
        );

        const songInput = screen.getByRole("textbox");
        fireEvent.change(songInput, { target: { value: "updated-song" } });

        expect(mockSetSongs).toHaveBeenCalledWith(["updated-song"]);
    });

    test("deletes a song when the delete button is clicked", () => {
        render(
            <EditableSongList
                songs={["song-to-delete", "keep-song"]}
                setSongs={mockSetSongs}
            />,
        );

        const deleteButtons = screen.getAllByRole("button", { name: /❌/i });
        userEvent.click(deleteButtons[0]);

        expect(mockSetSongs).toHaveBeenCalledWith(["keep-song"]);
    });
});
