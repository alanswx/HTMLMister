import React, { Component } from "react";
import { Route } from "react-router-dom";
import CoreList from "./components/CoreList";
import Current from "./components/Current";
import RomList from "./components/RomList";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
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
        <Route
          exact
          path="/control"
          render={({ history }) => <h2>cONTROL</h2>}
        />
        <Route exact path="/" render={({ history }) => <Current />} />
      </div>
    );
  }
}

export default App;
