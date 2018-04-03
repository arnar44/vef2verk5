import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

class App extends Component {
  render() {

    return (
      <main className="app">
        <Navigation />

        <section>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:department" component={School} />
            <Route component={NotFound} />
          </Switch>
        </section>

      </main>
    );
  }
}

export default App;
