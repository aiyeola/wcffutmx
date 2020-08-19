import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Form from './components/MaterialForm';
import Dashboard from './components/Dashboard';
import './styles/App.scss';

const App = () => (
  <> 
    <CssBaseline />
    <Suspense>
      <Router>
        <Switch>
          <Route path="/form" component={Form} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Suspense>
  </>
);

export default App;
