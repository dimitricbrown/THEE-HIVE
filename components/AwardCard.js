import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteAward } from '../api/awardData';

function AwardCard({ awardObj, onUpdate }) {
  const deleteThisAward = () => {
    if (window.confirm(`Delete ${awardObj.title}?`)) {
      deleteAward(awardObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{awardObj.title} - {awardObj.presenter}, {awardObj.year}</Card.Title>
        <Link href={`/award/edit/${awardObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAward} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

AwardCard.propTypes = {
  awardObj: PropTypes.shape({
    title: PropTypes.string,
    presenter: PropTypes.string,
    year: PropTypes.string,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AwardCard;
