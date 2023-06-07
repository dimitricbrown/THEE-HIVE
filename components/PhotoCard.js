import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteImage } from '../api/photoData';

function ImageCard({ imageObj, onUpdate }) {
  const deleteThisImage = () => {
    if (window.confirm(`Delete ${imageObj.description}?`)) {
      deleteImage(imageObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={imageObj.image} alt={imageObj.description} style={{ height: 'auto' }} />
      <Card.Body>
        <Card.Title>{imageObj.description}</Card.Title>
        <Link href={`/photo/${imageObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/photo/edit/${imageObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisImage} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ImageCard.propTypes = {
  imageObj: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ImageCard;
