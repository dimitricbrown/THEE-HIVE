import { getAlbumSongs, getSingleAlbum, deleteAlbum } from './albumData';
import { deleteComment } from './commentData';
import { getPostComments, getSinglePost } from './postData';
import { deleteSong } from './songData';

const viewAlbumDetails = (albumFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleAlbum(albumFirebaseKey), getAlbumSongs(albumFirebaseKey)])
    .then(([albumObj, albumSongsArray]) => {
      resolve({ ...albumObj, songs: albumSongsArray });
    }).catch((error) => reject(error));
});

const deleteAlbumSongs = (albumId) => new Promise((resolve, reject) => {
  getAlbumSongs(albumId).then((songsArray) => {
    console.warn(songsArray, 'Album Songs');
    const deleteSongPromises = songsArray.map((song) => deleteSong(song.firebaseKey));

    Promise.all(deleteSongPromises).then(() => {
      deleteAlbum(albumId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const getPostDetails = (postFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePost(postFirebaseKey), getPostComments(postFirebaseKey)])
    .then(([postObj, postCommentsArray]) => {
      resolve({ ...postObj, comments: postCommentsArray });
    }).catch((error) => reject(error));
});

const deletePostComments = (postId) => new Promise((resolve, reject) => {
  getPostComments(postId).then((commentsArray) => {
    console.warn(commentsArray, 'Post Comments');
    const deleteCommentPromises = commentsArray.map((comment) => deleteComment(comment.firebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteAlbum(postId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewAlbumDetails,
  deleteAlbumSongs,
  getPostDetails,
  deletePostComments,
};
