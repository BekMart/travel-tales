import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "./components/pages/auth/SignUpForm";
import SignInForm from "./components/pages/auth/SignInForm";
import PostCreateForm from "./components/pages/posts/PostCreateForm";
import PostPage from "./components/pages/posts/PostPage";
import PostsPage from "./components/pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import "./api/axios";
import SearchResultsPage from "./components/pages/posts/SearchResultsPage";
import PostEditForm from "./components/pages/posts/PostEditForm";
import ProfilePage from "./components/pages/profiles/ProfilePage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage 
                message="No results found. Adjust the search keyword or follow a user." 
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage 
                message="No results found. Adjust the search keyword or like a post." 
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/login" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/search" render={() => <SearchResultsPage />} />
          <Route render={() => <h1>404 Not Found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
