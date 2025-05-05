import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// Mocking the CurrentUserContext
const mockUser = {
  username: "testuser",
  profile_id: 1,
  profile_image: "https://example.com/profile.jpg",
};

// Test to render Navbar component and check for Login link
test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const signInLink = screen.getByRole("link", { name: "Login" });
  expect(signInLink).toBeInTheDocument();
});

// Test to check if the NavBar renders the users avatar when logged in
test("renders users profile image for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserContext.Provider value={mockUser}>
        <NavBar />
      </CurrentUserContext.Provider>
    </Router>
  );

  // screen.debug();
  const profileAvatar = await screen.findByAltText(
    "testuser's profile picture"
  );
  expect(profileAvatar).toBeInTheDocument();
});

// Test to check if the NavBar shows Log out and hides Login/Sign up for authenticated user
test("shows Log out and hides Login/Sign up for authenticated user", async () => {
  render(
    <Router>
      <CurrentUserContext.Provider value={mockUser}>
        <NavBar />
      </CurrentUserContext.Provider>
    </Router>
  );

  // Wait for the "Log out" link to appear
  const logoutLink = await screen.findByRole("link", { name: "Log out" });
  expect(logoutLink).toBeInTheDocument();

  // Login and Sign up should NOT be visible
  expect(screen.queryByRole("link", { name: "Login" })).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Sign up" })
  ).not.toBeInTheDocument();
});
