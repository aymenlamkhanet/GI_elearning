import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "./RegistrationForm";
import axios from "axios";

jest.mock("axios");

describe("RegistrationForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders sign-up form", () => {
    render(<RegistrationForm />);
    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
  });

  test("submits student registration", async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(<RegistrationForm />);

    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText("Create Account"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
