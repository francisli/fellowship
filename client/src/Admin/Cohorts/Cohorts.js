
import {useRouteMatch, Switch} from 'react-router-dom';

import {AdminProtectedRoute} from '../../AuthContext';
import CohortForm from './CohortForm';
import CohortsList from './CohortsList';

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
      <AdminProtectedRoute exact path={path}>
        <CohortsList />
      </AdminProtectedRoute>
    </Switch>
  );
}

export default Cohorts;
