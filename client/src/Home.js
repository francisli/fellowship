import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import AboutMe from './AboutMe';
import Api from './Api';
import {useAuthContext} from './AuthContext';

function Home() {
  const {user} = useAuthContext();

  useEffect(function() {
  }, []);

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-4">
          <AboutMe />
        </div>
        <div className="col-md-7 offset-md-1">
        </div>
      </div>
    </main>    
  );
}

export default Home;
