import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Login';
import Home from './Home/Home';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={Home} />
        <Route
          render={() => {
            return <p>Page not found</p>;
          }}
        />
      </Switch>
    </div>
  </Router>
);

export default App;
