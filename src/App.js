import React, { useEffect } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Graph from './Graph'
import Surprise from './Surprise.js';
import Input from './Input'
import Guess from './Guess';

const App = () => {

  return (
    <div >
      <Router>
        <div>
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/">Guess</Link>
              </li>
              <li>
                <Link to="/input">Input</Link>
              </li>
              <li>
                <Link to="/surprise">Surprise</Link>
              </li>
              <li>
                <Link to="/graph">graph</Link>
              </li>

            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/input">
              <Input />
            </Route>
            <Route path="/graph">
              <Graph />
            </Route>
            <Route path="/surprise">
              <Surprise />
            </Route>
            <Route path="/">
              <Guess />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;