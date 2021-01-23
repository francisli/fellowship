import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {StatusCodes} from 'http-status-codes';
import classNames from 'classnames';

import Api from '../Api';
import UnexpectedError from '../UnexpectedError';
import ValidationError from '../ValidationError';

function CohortForm() {
  const history = useHistory();
  const {id} = useParams();
  const [error, setError] = useState(null);
  const [cohort, setCohort] = useState(null);

  useEffect(function() {
    if (id) {
      Api.cohorts.get(id).then(response => setCohort(response.data));  
    } else {
      setCohort({
        name: '',
        slug: '',
        startsOn: '',
        endsOn: '',
        desc: ''
      });
    }
  }, [id]);

  const onChange = function(event) {
    const newCohort = {...cohort};
    newCohort[event.target.name] = event.target.value;
    setCohort(newCohort);
  };

  const onSubmit = async function(event) {
    event.preventDefault();
    setError(null);
    try {
      if (id) {
        await Api.cohorts.update(id, cohort);
      } else {
        await Api.cohorts.create(cohort);
      }
      history.push('/admin/cohorts');
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
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{id ? 'Edit' : 'New'} Cohort</h2>
            {cohort && (
              <form onSubmit={onSubmit}>
                {error && error.message && (
                  <div className="alert alert-danger">{error.message}</div>
                )}
                <div className="mb-3">
                  <label className="form-label" htmlFor="name"><sup>*</sup>Name</label>
                  <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('name')})} id="name" name="name" onChange={onChange} type="text" value={cohort.name} />
                  {error?.errorMessagesHTMLFor?.('name')}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="slug"><sup>*</sup>Slug</label>
                  <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('slug')})} id="slug" name="slug" onChange={onChange} type="text" value={cohort.slug} />
                  {error?.errorMessagesHTMLFor?.('slug')}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="startsOn"><sup>*</sup>Starts on</label>
                  <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('startsOn')})} id="startsOn" name="startsOn" onChange={onChange} placeholder="YYYY-MM-DD" type="date" value={cohort.startsOn} />
                  {error?.errorMessagesHTMLFor?.('startsOn')}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="endsOn"><sup>*</sup>Ended at</label>
                  <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('endsOn')})} id="endsOn" name="endsOn" onChange={onChange} placeholder="YYYY-MM-DD" type="date" value={cohort.endsOn} />
                  {error?.errorMessagesHTMLFor?.('endsOn')}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="desc">Description</label>
                  <textarea className={classNames('form-control', {'is-invalid': error?.errorsFor?.('desc')})} id="desc" name="desc" onChange={onChange} value={cohort.desc}></textarea>
                  {error?.errorMessagesHTMLFor?.('desc')}
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" type="submit">{id ? 'Update' : 'Create'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CohortForm;
