
import {useRouteMatch, Redirect, Switch} from 'react-router-dom';

import {AdminProtectedRoute} from '../../AuthContext';
import CohortForm from './CohortForm';
import CohortsList from './CohortsList';
import Meetings from './Meetings';

function Cohorts() {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <AdminProtectedRoute path={`${path}/new`}>
        <CohortForm />
      </AdminProtectedRoute>
      <AdminProtectedRoute path={`${path}/:id/edit`}>
        <CohortForm />
      </AdminProtectedRoute>
      <AdminProtectedRoute path={`${path}/:cohortId/meetings`}>
        <Meetings />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path={`${path}/:id`}>
        <Redirect to={`${useRouteMatch(`${path}/:id`)?.url}/meetings`} />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path={path}>
        <CohortsList />
      </AdminProtectedRoute>
    </Switch>
  );
}

export default Cohorts;
