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
import NotFound from "./pages/errors/NotFound";
import Forbidden403 from "./pages/errors/Forbidden403";
import ContactMessagesList from "./pages/contact/ContactMessagesList";
import ContactMessage from "./pages/contact/ContactMessage";
import ProfilePage from "./pages/profiles/ProfilePage";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import UsernameForm from "./pages/profiles/UsernameForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import AboutPage from "./pages/home/AboutPage";
import Footer from "./components/Footer";

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
          <Route exact path="/about" render={() => <AboutPage />} />
          <Route exact path="/contact" render={() => <ContactForm />} />
          <Route
            exact
            path="/contact_list"
            render={() => <ContactMessagesList />}
          />
          <Route
            exact
            path="/contact_list/:id"
            render={() => <ContactMessage />}
          />
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
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
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
          <Route exact path="/forbidden" render={() => <Forbidden403 />} />
          <Route exact path="/notfound" render={() => <NotFound />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
