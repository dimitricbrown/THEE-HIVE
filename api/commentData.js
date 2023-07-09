import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// TODO:  GET ALL COMMENTS
const getComments = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: CREATE COMMENT
const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments.json`, {
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

const getSingleComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// TODO: DELETE COMMENT
const deleteComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE COMMENT
const updateComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments/${payload.firebaseKey}.json`, {
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
  getComments,
  createComment,
  getSingleComment,
  deleteComment,
  updateComment,
};
