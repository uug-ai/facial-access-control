import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/home.tsx";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("button", { name: "Sign in" });

    expect(heading).toBeInTheDocument();
  });
});