import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";
import {
  CurrentUserContext,
  SetCurrentUserContext,
} from "../../contexts/CurrentUserContext";

const mockUser = {
  username: "testuser",
  profile_id: 1,
  profile_image: "https://example.com/profile.jpg",
};

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

test("renders users profile image for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserContext.Provider
        value={{
          username: "testuser",
          profile_id: 1,
          profile_image: "https://example.com/image.jpg",
        }}
      >
        <SetCurrentUserContext.Provider value={jest.fn()}>
          <NavBar />
        </SetCurrentUserContext.Provider>
      </CurrentUserContext.Provider>
    </Router>
  );

  // screen.debug();
  const profileAvatar = await screen.findByAltText(
    "testuser's profile picture"
  );
  expect(profileAvatar).toBeInTheDocument();
});

test("shows Log out and hides Login/Sign up for authenticated user", async () => {
  render(
    <Router>
      <CurrentUserContext.Provider value={mockUser}>
        <SetCurrentUserContext.Provider value={jest.fn()}>
          <NavBar />
        </SetCurrentUserContext.Provider>
      </CurrentUserContext.Provider>
    </Router>
  );

  // Wait for the "Log out" link to appear
  const logoutLink = await screen.findByRole("link", { name: /log out/i });
  expect(logoutLink).toBeInTheDocument();

  // Login and Sign up should NOT be visible
  expect(screen.queryByRole("link", { name: /login/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /sign up/i })).not.toBeInTheDocument();
});