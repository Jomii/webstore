import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//Pages
import { HomePage } from "./components/HomePage.jsx";
import { ItemsPage } from "./components/ItemsPage.jsx";
import { UsersPage } from "./components/UsersPage.jsx";
import { NoMatchPage } from "./components/NoMatchPage.jsx";

//Other components
import { Footer } from "./components/Footer.jsx";
import { NavigationBar } from "./components/NavigationBar.jsx";

export const App = () => {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/items" component={ItemsPage} />
          <Route path="/users" component={UsersPage} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
};
