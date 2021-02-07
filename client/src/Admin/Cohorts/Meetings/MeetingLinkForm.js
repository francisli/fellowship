import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {StatusCodes} from 'http-status-codes';
import classNames from 'classnames';

import Api from '../../../Api';
import UnexpectedError from '../../../UnexpectedError';
import ValidationError from '../../../ValidationError';

function MeetingForm() {
  const history = useHistory();
  const {cohortId, meetingId, id} = useParams();
  const [error, setError] = useState(null);
  const [link, setLink] = useState(null);

  useEffect(function() {
    if (id) {
      Api.links.get(id).then(response => setLink(response.data));  
    } else {
      setLink({
        MeetingId: meetingId,
        position: 0,
        type: 'SLIDES',
        href: '',
        desc: ''
      });
    }
  }, [id, meetingId]);

  const onChange = function(event) {
    const newLink = {...link};
    newLink[event.target.name] = event.target.value;
    setLink(newLink);
  };

  const onSubmit = async function(event) {
    event.preventDefault();
    setError(null);
    try {
      if (id) {
        await Api.links.update(id, link);
      } else {
        await Api.links.create(link);
      }
      history.push(`/admin/cohorts/${cohortId}/meetings/${meetingId}`);
    } catch (error) {
      if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
        setError(new ValidationError(error.response.data));
      } else {
        setError(new UnexpectedError());
      }
    }
  }

  return (
    <div className="row">
      <div className="col col-sm-10 col-md-8 col-lg-6">
        <h2>{id ? 'Edit' : 'New'} Link</h2>
        {link && (
          <form onSubmit={onSubmit}>
            {error && error.message && (
              <div className="alert alert-danger">{error.message}</div>
            )}
            <div className="mb-3">
              <label className="form-label" htmlFor="position"><sup>*</sup>Position</label>
              <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('position')})} id="position" name="position" onChange={onChange} type="number" value={link.position} />
              {error?.errorMessagesHTMLFor?.('position')}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="type"><sup>*</sup>Type</label>
              <select className={classNames('form-select', {'is-invalid': error?.errorsFor?.('type')})} id="type" name="type" onChange={onChange} value={link.type}>
                <option value="SLIDES">SLIDES</option>
                <option value="VIDEO">VIDEO</option>
                <option value="OTHER">OTHER</option>
              </select>
              {error?.errorMessagesHTMLFor?.('type')}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="href"><sup>*</sup>Link</label>
              <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('href')})} id="href" name="href" onChange={onChange} type="text" value={link.href} />
              {error?.errorMessagesHTMLFor?.('href')}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="desc">Description</label>
              <textarea className={classNames('form-control', {'is-invalid': error?.errorsFor?.('desc')})} id="desc" name="desc" onChange={onChange} value={link.desc}></textarea>
              {error?.errorMessagesHTMLFor?.('desc')}
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit">{id ? 'Update' : 'Create'}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default MeetingForm;
