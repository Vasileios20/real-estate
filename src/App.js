import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ListingCreateForm from "./pages/listings/ListingCreateForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();
  console.log(currentUser);
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/about" render={() => <h1>About</h1>} />
          <Route exact path="/contact" render={() => <h1>Contact</h1>} />
          <Route
            exact
            path="/listings/create"
            render={() => <ListingCreateForm />}
          />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
