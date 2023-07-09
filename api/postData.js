import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// TODO:  GET ALL POSTS
const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: CREATE POST
const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts.json`, {
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

const getSinglePost = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// TODO: DELETE POST
const deletePost = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE POST
const updatePost = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${payload.firebaseKey}.json`, {
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

// TODO: GET A SINGLE POST'S COMMENTS
const getPostComments = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments.json?orderBy="postId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
export {
  getPosts,
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
  getPostComments,
};
