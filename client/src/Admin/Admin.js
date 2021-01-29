
import {useRouteMatch, Link, Redirect, Switch} from 'react-router-dom';
import classNames from 'classnames';

import Api from '../Api';
import {AdminProtectedRoute} from '../AuthContext';
import Cohorts from './Cohorts';
import Meetings from './Meetings';
import { useEffect, useState } from 'react';

function Admin() {
  const {path, url} = useRouteMatch();
  const [cohorts, setCohorts] = useState([]);
  const [cohortId, setCohortId] = useState(0);

  useEffect(function() {
    Api.cohorts.index().then(response => setCohorts(response.data));
  }, []);

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="list-group mb-3">
            <Link className={classNames('list-group-item', 'list-group-item-action', {active: useRouteMatch(`${path}/cohorts`)})} to={`${url}/cohorts`}>Cohorts</Link>
          </div>
          <hr />
          <select className="form-select mb-3" value={cohortId} onChange={e => setCohortId(e.target.value)}>
            {!cohortId && (<option value={0}>&nbsp;</option>)}
            {cohorts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className={classNames('list-group', {'d-none': !parseInt(cohortId)})}>
            <Link className={classNames('list-group-item', 'list-group-item-action', {active: useRouteMatch(`${path}/meetings`)})} to={`${url}/meetings?cohortId=${cohortId}`}>Meetings</Link>
          </div>
        </div>
        <div className="col-md-9">
          <Switch>
            <AdminProtectedRoute path={`${path}/cohorts`}>
              <Cohorts />
            </AdminProtectedRoute>
            <AdminProtectedRoute path={`${path}/meetings`}>
              <Meetings />
            </AdminProtectedRoute>
            <AdminProtectedRoute exact path={path}>
              <Redirect to={`${url}/cohorts`} />
            </AdminProtectedRoute>
          </Switch>
        </div>
      </div>
    </main>
  );
}

export default Admin;
