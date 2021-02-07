import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {StatusCodes} from 'http-status-codes';
import classNames from 'classnames';

import Api from '../../../Api';
import UnexpectedError from '../../../UnexpectedError';
import ValidationError from '../../../ValidationError';

function MeetingForm() {
  const history = useHistory();
  const {cohortId, id} = useParams();
  const [error, setError] = useState(null);
  const [meeting, setMeeting] = useState(null);

  useEffect(function() {
    if (id) {
      Api.meetings.get(id).then(response => setMeeting(response.data));  
    } else {
      setMeeting({
        CohortId: cohortId,
        type: 'DESIGN',
        startsAt: '',
        endsAt: '',
        desc: ''
      });
    }
  }, [id, cohortId]);

  const onChange = function(event) {
    const newMeeting = {...meeting};
    newMeeting[event.target.name] = event.target.value;
    setMeeting(newMeeting);
  };

  const onSubmit = async function(event) {
    event.preventDefault();
    setError(null);
    try {
      let meetingId = id;
      if (meetingId) {
        await Api.meetings.update(meetingId, meeting);
      } else {
        const response = await Api.meetings.create(meeting);
        meetingId = response.data.id;
      }
      history.push(`/admin/cohorts/${meeting.CohortId}/meetings/${meetingId}`);
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
        <h2>{id ? 'Edit' : 'New'} Meeting</h2>
        {meeting && (
          <form onSubmit={onSubmit}>
            {error && error.message && (
              <div className="alert alert-danger">{error.message}</div>
            )}
            <div className="mb-3">
              <label className="form-label" htmlFor="type"><sup>*</sup>Type</label>
              <select className={classNames('form-select', {'is-invalid': error?.errorsFor?.('type')})} id="type" name="type" onChange={onChange} value={meeting.type}>
                <option value="DESIGN">Design</option>
                <option value="ENGINEERING">Engineering</option>
              </select>
              {error?.errorMessagesHTMLFor?.('type')}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="startsAt"><sup>*</sup>Starts at</label>
              <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('startsAt')})} id="startsAt" name="startsAt" onChange={onChange} placeholder="YYYY-MM-DDTHH:MM" type="datetime-local" value={meeting.startsAt} />
              {error?.errorMessagesHTMLFor?.('startsAt')}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="endsAt"><sup>*</sup>Ends at</label>
              <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('endsAt')})} id="endsAt" name="endsAt" onChange={onChange} placeholder="YYYY-MM-DDTHH:MM" type="datetime-local" value={meeting.endsAt} />
              {error?.errorMessagesHTMLFor?.('endsAt')}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="desc">Description</label>
              <textarea className={classNames('form-control', {'is-invalid': error?.errorsFor?.('desc')})} id="desc" name="desc" onChange={onChange} value={meeting.desc}></textarea>
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
