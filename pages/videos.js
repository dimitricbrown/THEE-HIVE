/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getVideos } from '../api/videoData';
import VideoCard from '../components/VideoCard';

function Videos({ isDestiny }) {
  // TODO: Set a state for videos
  const [videos, setVideos] = useState([]);

  // TODO: create a function that makes the API call to get all the videos
  const getAllTheVideos = () => {
    getVideos().then((fetchedVideos) => {
      if (isDestiny) {
        setVideos(fetchedVideos.filter((video) => video.isDestiny === true));
      } else {
        setVideos(fetchedVideos.filter((video) => video.isDestiny === false));
      }
    });
  };

  // TODO: make the call to the API to get all the videos on component render
  useEffect(() => {
    getAllTheVideos();
  }, [isDestiny]);

  return (
    <div className="text-center my-4">
      <Link href="/video/new" passHref>
        <Button>Add A Video</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over videos here using VideoCard component */}
        {videos.map((video) => (
          <VideoCard key={video.firebaseKey} videoObj={video} onUpdate={getAllTheVideos} />
        ))}
      </div>
    </div>
  );
}

Videos.propTypes = {
  isDestiny: PropTypes.bool.isRequired,
};

export default Videos;
