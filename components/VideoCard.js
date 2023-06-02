import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteVideo } from '../api/videoData';

function VideoCard({ videoObj, onUpdate }) {
  const deleteThisVideo = () => {
    if (window.confirm(`Delete ${videoObj.description}?`)) {
      deleteVideo(videoObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card controls width="100%">
      <Card.Video variant="top" src={videoObj.video} />
      <Card.Body>
        <Card.Title>{videoObj.description}</Card.Title>
        <Link href={`/video/${videoObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/video/edit/${videoObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisVideo} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

VideoCard.propTypes = {
  videoObj: PropTypes.shape({
    video: PropTypes.string,
    description: PropTypes.string,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default VideoCard;
