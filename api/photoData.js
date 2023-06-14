import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// TODO:  GET ALL IMAGES
const getImages = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/images.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: CREATE IMAGE
const createImage = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/images.json`, {
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

const getSingleImage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/images/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// TODO: DELETE IMAGE
const deleteImage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/images/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE IMAGE
const updateImage = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/images/${payload.firebaseKey}.json`, {
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
  getImages,
  createImage,
  getSingleImage,
  deleteImage,
  updateImage,
};
