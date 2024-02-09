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

function App() {
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
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
