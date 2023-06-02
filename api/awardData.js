import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// TODO:  GET ALL AWARDS
const getAwards = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/awards.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: CREATE AWARD
const createAward = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/awards.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleAward = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/awards/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// TODO: DELETE AWARD
const deleteAward = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/awards/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE AWARD
const updateAward = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/awards/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAwards,
  createAward,
  getSingleAward,
  deleteAward,
  updateAward,
};
