import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="app">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
    </Switch>
    </div>
  );
}

export default App;
