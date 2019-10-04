import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import LogoutView from "./views/LogoutView";
import RegisterView from "./views/RegisterView";
import UserView from "./views/UserView";
import ItemView from "./views/ItemView";
import ItemEditView from "./views/ItemEditView";
import ItemAddView from "./views/ItemAddView";
import ListView from "./views/ListView";
import Nav from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <Router>
      <Nav />
      <div className="container mt-3">
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/login" exact component={LoginView} />
          <Route path="/logout" exact component={LogoutView} />
          <Route path="/register" exact component={RegisterView} />
          <Route path="/user" exact component={UserView} />
          <Route path="/all" component={ListView} />
          <Route path="/item/add" component={ItemAddView} />
          <Route path="/item/:id/edit" component={ItemEditView} />
          <Route path="/item/:id" component={ItemView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
