/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getSongs } from '../api/songData';
import SongCard from '../components/SongCard';

function Songs() {
  // TODO: Set a state for songs
  const [songs, setSongs] = useState([]);

  // TODO: create a function that makes the API call to get all the songs
  const getAllTheSongs = () => {
    getSongs().then(setSongs);
  };

  // TODO: make the call to the API to get all the songs on component render
  useEffect(() => {
    getAllTheSongs();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {/* TODO: map over songs here using SongCard component */}
      {songs.map((song) => (
        <SongCard key={song.firebaseKey} songObj={song} onUpdate={getAllTheSongs} />
      ))}
    </div>
  );
}

export default Songs;
