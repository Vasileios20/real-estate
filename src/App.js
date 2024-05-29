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
import FinancialAdvicePage from "./pages/services/AdvisoryPage"
import AssetMgm from "./pages/services/AssetManagementPage";
import TransacionsPage from "./pages/services/TransactionsPage";
import ValuationPage from "./pages/services/ValuationPage";
import Footer from "./components/Footer";
import { Suspense, useState } from "react";
import ContactPage from "./pages/contact/ContactPage";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Terms from "./pages/legal/Terms";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

function App() {
  useUserStatus();
  const location = useLocation();
  const path = location.pathname;
  const [cookieConsent, setCookieConsent] = useState(getCookieConsentValue("cookieConsent"));
  const [showCookieBanner, setShowCookieBanner] = useState("byCookieValue");
  const [nonEssentialConsent, setNonEssentialConsent] = useState(getCookieConsentValue("nonEssentialCookies") === "true");


  if (cookieConsent === "false") {
    setCookieConsent(false);
  }

  if (
    path === "/listings/" ||
    path === "/privacyPolicy" ||
    path === "/terms"
  ) {
    styles.Main = styles.MainListings;
  } else {
    styles.Main = styles.MainHome;
  }

  return (
    <Suspense fallback="loading">
      <div className={styles.App}>
        <NavBar />
        <Container fluid className={styles.Main}>
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
            <Route exact path="/listings" render={() => <ListingsPage nonEssentialConsent={nonEssentialConsent} />} />
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
            <Route exact path="/privacyPolicy" render={() => <PrivacyPolicy />} />
            <Route exact path="/terms" render={() => <Terms />} />
            <Route exact path="/forbidden" render={() => <Forbidden403 />} />
            <Route exact path="/notfound" render={() => <NotFound />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Container>
        <Footer />
        <>
          <CookieConsent
            location="bottom"
            buttonText="Accept All Cookies"
            declineButtonText="Decline Non-Essential Cookies"
            enableDeclineButton
            disableStyles={true}
            visible={showCookieBanner}
            onAccept={() => {
              setNonEssentialConsent(true);
              setShowCookieBanner("hidden");
              document.cookie = "nonEssentialCookies=true; path=/; max-age=31536000";
            }}
            onDecline={() => {
              setNonEssentialConsent(false);
              setShowCookieBanner("hidden");
              document.cookie = "nonEssentialCookies=false; path=/; max-age=31536000";
            }}
            cookieName="nonEssentialCookies"
            containerClasses={styles.CookieBanner}
            contentClasses={`${styles.CookieBannerContent} col-10 col-lg-5 col-xl-3`}
            buttonClasses={styles.CookieBannerButton}
            declineButtonClasses={styles.CookieBannerDeclineButton}
          >
            This website uses cookies to enhance your browsing experience, provide personalized content, and analyze our traffic. We also use cookies from third-party services like Google Maps to display interactive maps. By clicking "Accept All Cookies", you consent to our use of all cookies. If you choose to "Decline Non-Essential Cookies", Google Maps and other third-party services will be disabled, but essential cookies for the proper functioning of the site will still be set. <a href="/privacyPolicy" style={{ color: '#000', textDecoration: 'underline' }}>Learn more</a>.
          </CookieConsent>
          <div className={styles.CookieReset}><i onClick={() => {
            setShowCookieBanner("show");
          }} className="fa-solid fa-link"></i>
          </div>
        </>
      </div>
    </Suspense>
  );
}

export default App;
