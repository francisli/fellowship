import {useEffect, useState} from 'react';
import {useHistory, useRouteMatch, Link} from 'react-router-dom';

import '../../Api';
import Api from '../../Api';

function CohortsList() {
  const history = useHistory();
  const {path} = useRouteMatch();
  const [cohorts, setCohorts] = useState([]);

  useEffect(function() {
    Api.cohorts.index().then(response => setCohorts(response.data));
  }, []);

  function onClick(id) {
    history.push(`${path}/${id}/edit`);
  }

  return (
    <>
      <h2>Cohorts</h2>
      <div className="mb-3">
        <Link className="btn btn-sm btn-outline-primary" to={`${path}/new`}>New</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Starts On</th>
              <th>Ends On</th>
            </tr>
          </thead>
          <tbody>
            {cohorts.map(c => (
              <tr key={c.id} onClick={() => onClick(c.id)} style={{cursor: 'pointer'}}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.slug}</td>
                <td>{c.startsOn}</td>
                <td>{c.endsOn}</td>
              </tr>            
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CohortsList;
