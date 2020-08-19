import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import './styles/App.scss';
import PrivateRoute from './PrivateRoute.jsx';
import Form from './components/Form/FormContainer';
import Dashboard from './components/Dashboard';
import NewForm from './components/NewForm';
import AdminForm from './components/Admin/AdminContainer'
import StudentInfo from './components/StudentInfo';

const PageNotFound = lazy(() => import('./components/PageNotFound'));

// theme={customTheme} this is optional
const App = () => (
  <ThemeProvider>
    <CSSReset />
    <Suspense>
      <Router>
        <NotificationContainer />
        <Switch>
          <Route exact path="/">
            <Redirect to="/student-biodata" />
          </Route>
          <PrivateRoute path="/404" component={PageNotFound} />
          <Route path="/student-biodata" component={Form} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/admin" component={AdminForm} />
          <Route path="/new-admin" component={AdminForm} />
          <Route path="/form" component={NewForm} />
          <Route path="/test" component={StudentInfo} />
        </Switch>
      </Router>
    </Suspense>
  </ThemeProvider>
);

export default App;
