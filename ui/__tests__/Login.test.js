import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "../src/app/login/page.tsx";

describe("Login", () => {
  it("renders a sign in button", () => {
    render(<Login />);

    const heading = screen.getByRole("button", { name: "Sign in" });

    expect(heading).toBeInTheDocument();
  });
});
