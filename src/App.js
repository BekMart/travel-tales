import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "./components/pages/auth/SignUpForm";
import SignInForm from "./components/pages/auth/SignInForm";
import PostCreateForm from "./components/pages/posts/PostCreateForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/profile" render={() => <h1>Profile</h1>} />
          <Route exact path="/feed" render={() => <h1>Feed</h1>} />
          <Route exact path="/login" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route render={() => <h1>404 Not Found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
