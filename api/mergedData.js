import { getAlbumSongs, getSingleAlbum, deleteAlbum } from './albumData';
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

export { viewAlbumDetails, deleteAlbumSongs };
