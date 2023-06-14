/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAwards } from '../api/awardData';
import AwardCard from '../components/AwardCard';

function Awards({ isDestiny }) {
  // TODO: Set a state for awards
  const [awards, setAwards] = useState([]);

  // TODO: create a function that makes the API call to get all the awards
  const getAllTheAwards = () => {
    getAwards().then((fetchedAwards) => {
      if (isDestiny) {
        setAwards(fetchedAwards.filter((award) => award.isDestiny === true));
      } else {
        setAwards(fetchedAwards.filter((award) => award.isDestiny === false));
      }
    });
  };

  // TODO: make the call to the API to get all the awards on component render
  useEffect(() => {
    getAllTheAwards();
  }, [isDestiny]);

  return (
    <div className="text-center my-4">
      <Link href="/award/new" passHref>
        <Button>Add An Award</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over awards here using AwardCard component */}
        {awards.map((award) => (
          <AwardCard key={award.firebaseKey} awardObj={award} onUpdate={getAllTheAwards} />
        ))}
      </div>
    </div>
  );
}

Awards.propTypes = {
  isDestiny: PropTypes.bool.isRequired,
};

export default Awards;
