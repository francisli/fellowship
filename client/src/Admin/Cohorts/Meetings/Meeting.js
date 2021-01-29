import {useEffect, useState} from 'react';
import {useParams, useRouteMatch, Link} from 'react-router-dom';

import Api from '../../../Api';

function Meetings() {
  const {id} = useParams();
  const {url} = useRouteMatch();
  const [meeting, setMeeting] = useState();

  useEffect(function() {
    Api.meetings.get(id).then(response => setMeeting(response.data));
  }, [id]);

  return (
    <>
      <h2>Meeting</h2>
      {meeting && (
        <p>
          <b>Type:</b> {meeting.type}<br />
          <b>Starts at:</b> {meeting.startsAt}<br />
          <b>Ends at:</b> {meeting.endsAt}<br />
          <b>Desc: </b> {meeting.desc}<br />
          <Link className="btn btn-sm btn-outline-primary" to={`${url}/edit`}>Edit</Link>
        </p>
      )}
    </>
  );
}

export default Meetings;
