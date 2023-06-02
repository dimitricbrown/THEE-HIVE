/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAwards } from '../api/awardData';
import { useAuth } from '../utils/context/authContext';
import AwardCard from '../components/AwardCard';

function Awards() {
  // TODO: Set a state for awards
  const [awards, setAwards] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the awards
  const getAllTheAwards = () => {
    getAwards(user.uid).then(setAwards);
  };

  // TODO: make the call to the API to get all the awards on component render
  useEffect(() => {
    getAllTheAwards();
  }, []);

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

export default Awards;
