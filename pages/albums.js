/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAlbums } from '../api/albumData';
import { useAuth } from '../utils/context/authContext';
import AlbumCard from '../components/AlbumCard';

function Albums() {
  // TODO: Set a state for albums
  const [albums, setAlbums] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the albums
  const getAllTheAlbums = () => {
    getAlbums(user.uid).then(setAlbums);
  };

  // TODO: make the call to the API to get all the albums on component render
  useEffect(() => {
    getAllTheAlbums();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/album/new" passHref>
        <Button>Add An Album</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over albums here using AlbumCard component */}
        {albums.map((album) => (
          <AlbumCard key={album.firebaseKey} albumObj={album} onUpdate={getAllTheAlbums} />
        ))}
      </div>
    </div>
  );
}

export default Albums;
