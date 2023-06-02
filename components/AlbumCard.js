import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteAlbum } from '../api/albumData';

function AlbumCard({ albumObj, onUpdate }) {
  const deleteThisAlbum = () => {
    if (window.confirm(`Delete ${albumObj.title}?`)) {
      deleteAlbum(albumObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={albumObj.image} alt={albumObj.title} style={{ height: 'auto' }} />
      <Card.Body>
        <Card.Title>{albumObj.title}</Card.Title>
        <h6 className="card-subtitle mb-2 text-muted">{albumObj.year}</h6>
        <Link href={`/album/${albumObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/album/edit/${albumObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAlbum} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

AlbumCard.propTypes = {
  albumObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AlbumCard;
