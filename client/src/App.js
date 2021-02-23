import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.scss';

import Admin from './Admin';
import {AuthContextProvider, AdminProtectedRoute} from './AuthContext';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Passwords from './Passwords';
import Register from './Register';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/passwords">
            <Passwords />
          </Route>
          {process.env.REACT_APP_FEATURE_REGISTRATION === 'true' && (
            <Route path="/register">
              <Register />
            </Route>
          )}
          <AdminProtectedRoute path="/admin">
            <Admin />
          </AdminProtectedRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
