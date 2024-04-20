import Container from "react-bootstrap/Container";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch, useLocation } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ListingCreateForm from "./pages/listings/ListingCreateForm";
import ListingPage from "./pages/listings/ListingPage";
import ListingEditForm from "./pages/listings/ListingEditForm";
import ListingsPage from "./pages/listings/ListingsPage";
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
import FinancialAdvicePage from "./pages/home/AdvisoryPage";
import AssetMgm from "./pages/home/AssetManagementPage";
import TransacionsPage from "./pages/home/TransactionsPage";
import ValuationPage from "./pages/home/ValuationPage";
import Footer from "./components/Footer";
import { Suspense } from "react";
import ContactPage from "./pages/contact/ContactPage";

function App() {
  useUserStatus();
  const location = useLocation();
  const path = location.pathname;

  if (
    path === "/" ||
    path === "/contact" ||
    path === "/about" ||
    path === "/advisory" ||
    path === "/assetManagement" ||
    path === "/transactions" ||
    path === "/valuation"
  ) {
    styles.Main = styles.MainHome;
  } else {
    styles.Main = styles.MainListings;
  }
  return (
    <Suspense fallback="loading">
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/about" render={() => <AboutPage />} />
            <Route
              exact
              path="/advisory"
              render={() => <FinancialAdvicePage />}
            />
            <Route
              exact
              path="/assetManagement"
              render={() => <AssetMgm />}
            />
            <Route
              exact
              path="/transactions"
              render={() => <TransacionsPage />}
            />
            <Route exact path="/valuation" render={() => <ValuationPage />} />
            <Route exact path="/contact" render={() => <ContactPage />} />
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
    </Suspense>
  );
}

export default App;
