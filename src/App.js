import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Header from './Header';

import Register from './Register'

import { Route, Switch} from 'react-router-dom'



const My404 = () => {
  return (
    <div className="App">
      404 You're lost!
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <main>
      <Header />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/register" component={ Register } />
{/*          <Route exact path="/" component={} />
          <Route exact path="/" component={} />
          <Route exact path="/" component={} />
          <Route exact path="/" component={} />*/}
          <Route component={ My404 } />
        </Switch>
      </main>
    </div>
  );
}

export default App;
