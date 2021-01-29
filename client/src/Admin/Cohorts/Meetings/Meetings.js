
import {useRouteMatch, Switch} from 'react-router-dom';

import {AdminProtectedRoute} from '../../../AuthContext';
import Meeting from './Meeting';
import MeetingForm from './MeetingForm';
import MeetingsList from './MeetingsList';

function Meetings() {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <AdminProtectedRoute path={`${path}/new`}>
        <MeetingForm />
      </AdminProtectedRoute>
      <AdminProtectedRoute path={`${path}/:id/edit`}>
        <MeetingForm />
      </AdminProtectedRoute>
      <AdminProtectedRoute path={`${path}/:id`}>
        <Meeting />
      </AdminProtectedRoute>
      <AdminProtectedRoute exact path={path}>
        <MeetingsList />
      </AdminProtectedRoute>
    </Switch>
  );
}

export default Meetings;
