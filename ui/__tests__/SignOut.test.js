// __tests__/SignOut.test.js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignOutButton from "../src/components/SignOutButton";
import { signOut } from "next-auth/react";

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("SignOutButton", () => {
  it('renders "Sign out" button', () => {
    render(<SignOutButton />);
    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
  });

  it("calls signOut when button is clicked", async () => {
    render(<SignOutButton />);
    const signOutButton = screen.getByRole("button", { name: /sign out/i });

    await userEvent.click(signOutButton);

    expect(signOut).toHaveBeenCalledWith({
      callbackUrl: "/signin",
    });
  });
});
