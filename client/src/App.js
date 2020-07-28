import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import Navbar from './components/layout/Navbar'
import SearchWord from './components/layout/SearchWord'
import Visualise from './components/gui/Visualise'
import Alert from './components/layout/Alert'

import './css/reset.css'
import './css/App.css';

const App = ({ nameToVisualise }) => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Alert />
        <Route exact path="/" component={SearchWord} />
        <Switch>
          <Route exact path="/visualise" component={Visualise} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
)

export default App;
