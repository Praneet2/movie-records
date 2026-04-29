import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const SimpleForm = () => {
    const [name, setName] = React.useState("");

    return (
        <div>
            <label htmlFor="name-input">Name</label>
            <input
                id="name-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <p>{name}</p>
        </div>
    );
};

describe("Basic Form Example", () => {
    test("renders the name input", () => {
        render(<SimpleForm />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    test("updates the name when typing", () => {
        render(<SimpleForm />);

        const nameInput = screen.getByLabelText(/name/i);
        userEvent.type(nameInput, "Alice");

        expect(nameInput).toHaveValue("Alice");
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });
});
