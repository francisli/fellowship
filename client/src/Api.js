import axios from 'axios';

const instance = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

const Api = {
  auth: {
    login(email, password) {
      return instance.post('/api/auth/login', {email, password});
    },
    logout() {
      return instance.get('/api/auth/logout');
    },
    register(data) {
      return instance.post('/api/auth/register', data);
    }
  },
  cohorts: {
    index() {
      return instance.get('/api/cohorts');
    },
    create(data) {
      return instance.post('/api/cohorts', data);
    },
    get(id) {
      return instance.get(`/api/cohorts/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/cohorts/${id}`, data);
    }
  },
  links: {
    index(meetingId) {
      const params = {};
      if (meetingId) {
        params.meetingId = meetingId;
      }
      return instance.get('/api/links', {params});
    },
    create(data) {
      return instance.post('/api/links', data);
    },
    get(id) {
      return instance.get(`/api/links/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/links/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/links/${id}`);
    }
  },
  meetings: {
    index(cohortId) {
      const params = {};
      if (cohortId) {
        params.cohortId = cohortId;
      }
      return instance.get('/api/meetings', {params});
    },
    create(data) {
      return instance.post('/api/meetings', data);
    },
    get(id) {
      return instance.get(`/api/meetings/${id}`);
    },
    update(id, data) {
      return instance.patch(`/api/meetings/${id}`, data);
    }
  },
  passwords: {
    reset(email) {
      return instance.post('/api/passwords', {email});
    },
    get(token) {
      return instance.get(`/api/passwords/${token}`);
    },
    update(token, password) {
      return instance.patch(`/api/passwords/${token}`, {password});
    }
  },
  users: {
    me() {
      return instance.get('/api/users/me');
    }
  }
};

export default Api;
