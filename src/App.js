import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import "./api/axios";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import SearchResultsPage from "./pages/posts/SearchResultsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import Locations from "./pages/locations/Locations";
import LocationsPosts from "./pages/locations/LocationsPosts";
import styles from "./App.module.css";

function App() {
  // Get currently logged-in user
  const currentUser = useCurrentUser();
  // Fallback to empty string if no user
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      {/* Global navigation bar */}
      <NavBar />
        {/* Main content container with styling */}
        <Container className={styles.Main}>
          <Switch>
            {/* Home page – displays all posts */}
            <Route
              exact
              path="/"
              render={() => (
                <PostsPage
                  message={
                    <>
                      No results found. <br /> Adjust the search keyword and try
                      again.
                    </>
                  }
                />
              )}
            />
            {/* Feed page – shows posts by followed users */}
            <Route
              exact
              path="/feed"
              render={() => (
                <PostsPage
                  message={
                    <>
                      No results found. <br /> Follow a user to view their posts
                      here.
                    </>
                  }
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              )}
            />
            {/* Liked posts page – shows user's liked posts */}
            <Route
              exact
              path="/liked"
              render={() => (
                <PostsPage
                  message={
                    <>
                      No results found. <br /> Like a post to see it featured
                      here.
                    </>
                  }
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                />
              )}
            />
            {/* User profile page */}
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            {/* Authentication routes */}
            <Route exact path="/login" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            {/* Post creation, viewing and editing routes */}
            <Route
              exact
              path="/posts/create"
              render={() => <PostCreateForm />}
            />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route
              exact
              path="/posts/:id/edit"
              render={() => <PostEditForm />}
            />
            {/* Search results route */}
            <Route exact path="/search" render={() => <SearchResultsPage />} />
            {/* Profile edit routes */}
            <Route
              exact
              path="/profiles/:id/edit/username"
              render={() => <UsernameForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit/password"
              render={() => <UserPasswordForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit"
              render={() => <ProfileEditForm />}
            />
            {/* Location listings and location-specific posts */}
            <Route exact path="/locations" render={() => <Locations />} />
            <Route
              exact
              path="/locations/:slug"
              render={() => <LocationsPosts />}
            />
            {/* 404 fallback route */}
            <Route render={() => <NotFound />} />
          </Switch>
        </Container>

      {/* Global footer */}
      <footer className={styles.Footer}>© 2025 Travel Tales</footer>
      {/* Toast message container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
