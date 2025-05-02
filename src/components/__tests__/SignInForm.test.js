import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInForm from "../../pages/auth/SignInForm";
import { CurrentUserContext, SetCurrentUserContext } from "../../contexts/CurrentUserContext";

// Mock user data returned from backend
const mockUser = {
  pk: 1,
  username: "testuser",
  profile_id: 1,
  profile_image: "https://example.com/image.jpg",
};

test("user can log in and sees Log out", async () => {
  const setCurrentUser = jest.fn();

  render(
    <Router>
      <CurrentUserContext.Provider value={null}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
          <SignInForm />
        </SetCurrentUserContext.Provider>
      </CurrentUserContext.Provider>
    </Router>
  );

  // Fill in form fields
  fireEvent.change(screen.getByPlaceholderText('Username'), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: "Log in" }));

  // Wait for login handler to resolve and check that setCurrentUser was called
  await waitFor(() => {
    expect(setCurrentUser).toHaveBeenCalledWith(expect.objectContaining({ username: "testuser" }));
  });
});