/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteAlbumSongs, viewAlbumDetails } from '../../api/mergedData';
import { deleteAlbum } from '../../api/albumData';
import SongCard from '../../components/SongCard';

export default function ViewAlbum() {
  const [albumDetails, setAlbumDetails] = useState({});
  const router = useRouter();
  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const onUpdate = () => {
    viewAlbumDetails(firebaseKey).then(setAlbumDetails);
  };

  const deleteThisAlbum = () => {
    if (window.confirm(`Delete ${albumDetails.title}?`)) {
      deleteAlbum(albumDetails.firebaseKey)
        .then(() => deleteAlbumSongs(albumDetails.firebaseKey))
        .then(() => onUpdate(onUpdate));
    }
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewAlbumDetails(firebaseKey).then(setAlbumDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <div>
          <img src={albumDetails.image} alt={albumDetails.title} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>{albumDetails.title}</h5>
          <h5>{albumDetails.year}</h5>
        </div>
        <div>
          <Link href="/song/new" passHref>
            <Button variant="primary" className="m-2">ADD SONG</Button>
          </Link>
          <Link href={`/album/edit/${albumDetails.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Link href="/albums" passHref>
            <Button variant="danger" onClick={deleteThisAlbum} className="m-2">
              DELETE
            </Button>
          </Link>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {albumDetails?.songs?.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}
