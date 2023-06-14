/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAlbums } from '../api/albumData';
import AlbumCard from '../components/AlbumCard';

function Albums({ isDestiny }) {
  // TODO: Set a state for albums
  const [albums, setAlbums] = useState([]);

  // TODO: create a function that makes the API call to get all the albums
  const getAllTheAlbums = () => {
    getAlbums().then((fetchedAlbums) => {
      if (isDestiny) {
        setAlbums(fetchedAlbums.filter((album) => album.isDestiny === true));
      } else {
        setAlbums(fetchedAlbums.filter((album) => album.isDestiny === false));
      }
    });
  };

  // TODO: make the call to the API to get all the albums on component render
  useEffect(() => {
    getAllTheAlbums();
  }, [isDestiny]);

  return (
    <div className="text-center my-4">
      <Link href="/album/new" passHref>
        <Button>Add An Album</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over albums here using AwardCard component */}
        {albums.map((album) => (
          <AlbumCard key={album.firebaseKey} albumObj={album} onUpdate={getAllTheAlbums} />
        ))}
      </div>
    </div>
  );
}

Albums.propTypes = {
  isDestiny: PropTypes.bool.isRequired,
};

export default Albums;
