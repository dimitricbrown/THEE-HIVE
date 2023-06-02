import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// TODO:  GET ALL ALBUMS
const getAlbums = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: CREATE ALBUM
const createAlbum = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums.json`, {
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

const getSingleAlbum = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// TODO: DELETE ALBUM
const deleteAlbum = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE ALBUM
const updateAlbum = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/albums/${payload.firebaseKey}.json`, {
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
  getAlbums,
  createAlbum,
  getSingleAlbum,
  deleteAlbum,
  updateAlbum,
};
