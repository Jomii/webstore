import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//Pages
import { HomePage } from "./components/HomePage.jsx";
import { MarketPage } from "./components/MarketPage.jsx";
import { UsersPage } from "./components/UsersPage.jsx";
import { NoMatchPage } from "./components/NoMatchPage.jsx";
import { LoginPage } from "./components/LoginPage.jsx";
import { RegisterPage } from "./components/RegisterPage.jsx";
import { ProfilePage } from "./components/ProfilePage.jsx";
import { PendingItemsPage } from "./components/PendingItemsPage.jsx";

//Other components
import { Footer } from "./components/Footer.jsx";
import { NavigationBar } from "./components/NavigationBar.jsx";
import { Layout } from "./components/Layout.jsx";

export const App = () => {
  return (
    <>
      <Router>
        <NavigationBar />
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/market" component={MarketPage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/pending-items" component={PendingItemsPage} />
            <Route component={NoMatchPage} />
          </Switch>
        </Layout>
      </Router>
      <Footer />
    </>
  );
};
