import {useEffect, useState} from 'react';
import {DateTime} from 'luxon';

import Api from '../Api';
import './Meetings.scss';
import MeetingsC4SF from './MeetingsC4SF.png';
import MeetingsUber from './MeetingsUber.png';

function Meetings({cohortId, cohortStartsOn}) {
  const [meetings, setMeetings] = useState([]);

  useEffect(function() {
    Api.meetings.index(cohortId, true).then(response => setMeetings(response.data));
  }, []);

  const meetingsListItems = [];
  const cohortStartDate = DateTime.fromISO(cohortStartsOn);
  let weekNumber = Number.MAX_SAFE_INTEGER;
  for (const m of meetings) {
    const meetingDate = DateTime.fromISO(m.startsAt);
    const meetingWeekNumber = meetingDate.weekNumber - cohortStartDate.weekNumber + 1;
    if (meetingWeekNumber < weekNumber) {
      meetingsListItems.push(<h5 key={`week-${meetingWeekNumber}`} className="meetings__header">&lt; Week {meetingWeekNumber} &gt;</h5>);
      weekNumber = meetingWeekNumber;
    }
    meetingsListItems.push(
      <li key={m.id} className={`meeting meeting--${m.type.toLowerCase()}`}>
        <div class="meeting__icon"></div>
        <div>
          <div class="meeting__date">{meetingDate.toFormat('MMM d')}</div>
          {m.desc && <div class="meeting__desc">{m.desc}</div>}
          {m.Links && m.Links.length > 0 && (
            <ol className="meeting__links">
              {m.Links.map(l => (
                <li className={`link link--${l.type.toLowerCase()}`}>
                  <span className="link__icon"></span>
                  <a href={l.href}>
                    {l.desc && l.desc}
                    {!l.desc && l.type === 'SLIDES' && "Slides"}
                    {!l.desc && l.type === 'VIDEO' && "Video"}
                  </a>
                </li>
              ))}
            </ol>
          )}
        </div>
      </li>
    );
  }

  return (
    <>
      {meetings.length > 0 && (
        <>
          <h4>Meetings</h4>
          <ol className="meetings">
            {meetingsListItems}
          </ol>
        </>
      )}
    </>
  );
}
export default Meetings;
