// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Rules from './components/Rules';
import Poker from './Poker'; // Твоя текущая игра

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/rules" component={Rules} />
      <Route path="/room/:id" component={Poker} />
    </Switch>
  </Router>
);
console.log('Poker:', Poker);
console.log('Home:', Home);
console.log('Rules:', Rules);

export default App;
