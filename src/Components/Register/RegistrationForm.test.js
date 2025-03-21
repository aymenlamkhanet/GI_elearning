import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationForm from "./RegistrationForm";

describe("RegistrationForm Component", () => {
  // Mock console.log before each test
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  // Restore console.log after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test 1: Renders the component without crashing
  test("renders without crashing", () => {
    render(<RegistrationForm />);
    expect(screen.getByText(/Join the Revolution/i)).toBeInTheDocument();
  });

  // Test 2: Toggles between Sign Up and Sign In forms
  test("toggles between Sign Up and Sign In forms", () => {
    render(<RegistrationForm />);

    // Initially, it should be in Sign Up mode
    expect(screen.getByText(/Join the Revolution/i)).toBeInTheDocument();

    // Click the toggle button to switch to Sign In mode
    const toggleButton = screen.getByRole("button", { name: /Sign In/i });
    fireEvent.click(toggleButton);

    // Now, it should be in Sign In mode
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();

    // Click the toggle button again to switch back to Sign Up mode
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
    expect(screen.getByText(/Join the Revolution/i)).toBeInTheDocument();
  });

  // Test 3: Handles form input changes
  test("handles form input changes", () => {
    render(<RegistrationForm />);

    // Test name input (only visible in Sign Up mode)
    const nameInput = screen.getByPlaceholderText(/Full Name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    // Test email input
    const emailInput = screen.getByPlaceholderText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput.value).toBe("john@example.com");

    // Test password input
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  // Test 4: Submits the Sign Up form
  test("submits the Sign Up form", () => {
    render(<RegistrationForm />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    const submitButton = screen.getByRole("button", {
      name: /Create Account/i,
    });
    fireEvent.click(submitButton);

    // Check if the form data is logged
    expect(console.log).toHaveBeenCalledWith("Sign Up Data:", {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
  });

  // Test 5: Name field is hidden in Sign In mode
  test("name field is hidden in Sign In mode", () => {
    render(<RegistrationForm />);

    // Switch to Sign In mode
    const toggleButton = screen.getByRole("button", { name: /Sign In/i });
    fireEvent.click(toggleButton);

    // Check if the name field is not in the document
    expect(screen.queryByPlaceholderText(/Full Name/i)).toBeNull();
  });
});
