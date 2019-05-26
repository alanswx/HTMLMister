import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import CoreList from "./components/CoreList";
import Current from "./components/Current";
import RomList from "./components/RomList";
import "./App.css";

const App = () => (
  <div className="App">
    <BrowserRouter>
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
