import {useEffect, useState} from 'react';
import {useHistory, useRouteMatch, Link, useLocation} from 'react-router-dom';

import Api from '../../../Api';

function MeetingsList() {
  const history = useHistory();
  const {url, params} = useRouteMatch();
  const cohortId = params?.id;
  const [meetings, setMeetings] = useState([]);

  useEffect(function() {
    Api.meetings.index(cohortId).then(response => setMeetings(response.data));
  }, [cohortId]);

  function onClick(id) {
    history.push(`${url}/${id}`);
  }

  return (
    <>
      <h2>Meetings</h2>
      <div className="mb-3">
        <Link className="btn btn-sm btn-outline-primary" to={`${url}/new`}>New</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Starts</th>
              <th>Ends</th>
              <th>Desc</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map(m => (
              <tr key={m.id} onClick={() => onClick(m.id)} style={{cursor: 'pointer'}}>
                <td>{m.id}</td>
                <td>{m.type}</td>
                <td>{m.startsAt}</td>
                <td>{m.endsAt}</td>
                <td>{m.desc}</td>
              </tr>            
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MeetingsList;
