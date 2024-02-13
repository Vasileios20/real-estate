import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ListingCreateForm from "./pages/listings/ListingCreateForm";
import ListingPage from "./pages/listings/ListingPage";
import ListingEditForm from "./pages/listings/ListingEditForm";
import ListingsPage from "./pages/listings/ListingsPage";
import ContactForm from "./pages/contact/ContactForm";
import Wishlist from "./pages/wishlist/Wishlist";
import HomePage from "./pages/home/HomePage";
import useUserStatus from "./hooks/useUserStatus";
import NotFound from "./components/NotFounds";
import Forbidden403 from "./components/Forbidden403";

function App() {
  useUserStatus();
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/about" render={() => <h1>About</h1>} />
          <Route exact path="/contact" render={() => <ContactForm />} />
          <Route exact path="/listings" render={() => <ListingsPage />} />
          <Route
            exact
            path="/listings/create"
            render={() => <ListingCreateForm />}
          />
          <Route exact path="/listings/:id" render={() => <ListingPage />} />
          <Route
            exact
            path="/listings/:id/edit"
            render={() => <ListingEditForm />}
          />
          <Route exact path="/wishlist" render={() => <Wishlist />} />
          <Route exact path="/forbidden" render={() => <Forbidden403 />} />
          <Route exact path="/notfound" render={() => <NotFound />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
