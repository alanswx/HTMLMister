import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

import CoreList from "./components/CoreList/CoreList";
import Current from "./components/Current/Current";
import RomList from "./components/RomList/RomList";
import "./App.css";

axios.defaults.baseURL = `http://${process.env.REACT_APP_MISTER_HOST}`;

const App = () => (
  <div className="App">
    <BrowserRouter basename="/react">
      <Route
        exact
        path="/cores/:dir*"
        render={({ history, match }) => <CoreList dir={match.params.dir} />}
      />
      <Route
        exact
        path="/roms/:dir*"
        render={({ history, match }) => <RomList dir={match.params.dir} />}
      />
      <Route exact path="/control" render={({ history }) => <h2>cONTROL</h2>} />
      <Route exact path="/" render={({ history }) => <Current />} />
    </BrowserRouter>
  </div>
);

export default App;
