// SignOutButton.test.js (or .test.tsx if using TypeScript)
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignOutButton from "../src/components/SignOutButton";
import { signOut } from "next-auth/react";

// Mock next-auth/react's signOut function
jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("SignOutButton", () => {
  it('renders "Sign out" button', () => {
    // Render the SignOutButton component
    render(<SignOutButton />);

    // Get the button element
    const buttonElement = screen.getByRole("button", { name: /Sign out/i });

    // Check if the button is in the document
    expect(buttonElement).toBeInTheDocument();
  });
});
