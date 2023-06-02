import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// TODO:  GET ALL VIDEOS
const getVideos = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/videos.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: CREATE VIDEO
const createVideo = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/videos.json`, {
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

const getSingleVideo = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/videos/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// TODO: DELETE VIDEO
const deleteVideo = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/videos/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE VIDEO
const updateVideo = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/videos/${payload.firebaseKey}.json`, {
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
  getVideos,
  createVideo,
  getSingleVideo,
  deleteVideo,
  updateVideo,
};
