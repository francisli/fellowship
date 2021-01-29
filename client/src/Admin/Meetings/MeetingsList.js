import {useEffect, useState} from 'react';
import {useHistory, useRouteMatch, Link, useLocation} from 'react-router-dom';

import '../../Api';
import Api from '../../Api';

function MeetingsList() {
  const history = useHistory();
  const {path} = useRouteMatch();
  const query = new URLSearchParams(useLocation().search);
  const cohortId = query.get('cohortId');
  const [meetings, setMeetings] = useState([]);

  useEffect(function() {
    Api.meetings.index(cohortId).then(response => setMeetings(response.data));
  }, [cohortId]);

  function onClick(id) {
    history.push(`${path}/${id}`);
  }

  return (
    <>
      <h2>Meetings</h2>
      <div className="mb-3">
        <Link className="btn btn-sm btn-outline-primary" to={`${path}/new?cohortId=${cohortId}`}>New</Link>
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
              <th></th>
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
                <td>
                  <Link className="btn btn-sm btn-outline-primary" to={`${path}/${m.id}/edit`}>Edit</Link>
                </td>
              </tr>            
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MeetingsList;
