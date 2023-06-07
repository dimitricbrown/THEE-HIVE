/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { viewAlbumDetails } from '../../api/mergedData';
import { deleteAlbum } from '../../api/albumData';
import SongCard from '../../components/SongCard';

export default function ViewAlbum({ albumObj, onUpdate }) {
  const [albumDetails, setAlbumDetails] = useState({});
  const router = useRouter();

  const deleteThisAlbum = () => {
    if (window.confirm(`Delete ${albumObj.title}?`)) {
      deleteAlbum(albumObj.firebaseKey).then(() => onUpdate());
    }
  };

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

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
          {/* <Link href={`/album/edit/${albumObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link> */}
          <Button variant="danger" onClick={deleteThisAlbum} className="m-2">
            DELETE
          </Button>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {albumDetails?.songs?.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} />
        ))}
      </div>
    </div>
  );
}

ViewAlbum.propTypes = {
  albumObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
