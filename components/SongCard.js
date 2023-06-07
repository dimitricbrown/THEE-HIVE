/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSong } from '../api/songData';

function SongCard({ songObj, onUpdate }) {
  const deleteThisSong = () => {
    if (window.confirm(`Delete ${songObj.title}?`)) {
      deleteSong(songObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{songObj.trackNum}. {songObj.title}{songObj.hasFeat
          ? ` (FEAT. ${songObj.featureArtist})`
          : ''}
        </Card.Title>
        <Link href={`/song/edit/${songObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisSong} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

SongCard.propTypes = {
  songObj: PropTypes.shape({
    trackNum: PropTypes.string,
    title: PropTypes.string,
    hasFeat: PropTypes.bool,
    featureArtist: PropTypes.any,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SongCard;
