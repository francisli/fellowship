
import {useRouteMatch, Link, Redirect, Switch} from 'react-router-dom';
import classNames from 'classnames';

import Api from '../Api';
import {AdminProtectedRoute} from '../AuthContext';
import Cohorts from './Cohorts';
import { useEffect, useState } from 'react';

function Admin() {
  const {path, url} = useRouteMatch();
  const {params} = useRouteMatch(`${path}/cohorts/:cohortId`) || {};
  const cohortId = parseInt(params?.cohortId)

  const [cohort, setCohort] = useState();
  useEffect(function() {
    setCohort(null);
    if (cohortId) {
      Api.cohorts.get(cohortId).then(response => setCohort(response.data));
    }
  }, [cohortId]);

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="list-group mb-3">
            <Link className={classNames('list-group-item', 'list-group-item-action', {active: useRouteMatch(`${path}/cohorts`) && !cohortId})} to={`${url}/cohorts`}>Cohorts</Link>
          </div>
          {cohort && (
            <>
              <hr />
              <h5>{cohort.name}</h5>
              <p>
                <Link className="btn btn-sm btn-outline-primary" to={`${url}/cohorts/${cohort.id}/edit`}>Edit</Link>
              </p>
            </>
          )}
          <div className={classNames('list-group', {'d-none': !cohort})}>
            <Link className={classNames('list-group-item', 'list-group-item-action', {active: useRouteMatch(`${path}/cohorts/${cohortId}/meetings`)})} to={`${url}/cohorts/${cohortId}/meetings`}>Meetings</Link>
          </div>
        </div>
        <div className="col-md-9">
          <Switch>
            <AdminProtectedRoute path={`${path}/cohorts`}>
              <Cohorts />
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
