
import {useRouteMatch, Link, Redirect, Route, Switch} from 'react-router-dom';
import classNames from 'classnames';

import {AdminProtectedRoute} from '../AuthContext';
import Cohorts from './Cohorts';
import CohortForm from './CohortForm';

function Admin() {
  const {path, url} = useRouteMatch();

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-4">
          <ul className="list-group">
            <Link className={classNames('list-group-item', 'list-group-item-action', {active: useRouteMatch(`${path}/cohorts`)})} to={`${url}/cohorts`}>Cohorts</Link>
          </ul>
        </div>
        <div className="col-md-8">
          <Switch>
            <AdminProtectedRoute exact path={path}>
              <Redirect to={`${url}/cohorts`} />
            </AdminProtectedRoute>
            <AdminProtectedRoute path={`${path}/cohorts/new`}>
              <CohortForm />
            </AdminProtectedRoute>
            <AdminProtectedRoute path={`${path}/cohorts/:id/edit`}>
              <CohortForm />
            </AdminProtectedRoute>
            <AdminProtectedRoute path={`${path}/cohorts`}>
              <Cohorts />
            </AdminProtectedRoute>
          </Switch>
        </div>
      </div>
    </main>
  );
}

export default Admin;
