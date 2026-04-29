import { render, screen } from "@testing-library/react";
import { WatchStatus } from "../src/components/WatchStatus";

describe("WatchStatus component", () => {
    test("shows not watched text when the movie is not seen", () => {
        render(
            <WatchStatus watched={{ seen: false, liked: false, when: null }} />,
        );

        expect(screen.getByText(/Not yet watched/i)).toBeInTheDocument();
    });

    test("shows watched text when the movie is seen", () => {
        render(
            <WatchStatus
                watched={{ seen: true, liked: false, when: "2025-01-01" }}
            />,
        );

        expect(screen.getByText(/Watched/i)).toBeInTheDocument();
    });
});
