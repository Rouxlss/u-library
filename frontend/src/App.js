import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import './App.css';

import { Login } from './components/Login';
import { DashboardRoutes } from './components/DashboardRoutes';

function App() {

  return (
    <div className="">
      <Router>
        <Switch>
          <Route exact path="/login"
            component={Login}>
          </Route>
          <Route path="/"
            component={DashboardRoutes}>
          </Route>
        </Switch>
        

      </Router>
    </div>

  );
}

export default App;
