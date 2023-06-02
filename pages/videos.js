/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getVideos } from '../api/videoData';
import { useAuth } from '../utils/context/authContext';
import VideoCard from '../components/VideoCard';

function Videos() {
  // TODO: Set a state for videos
  const [videos, setVideos] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the videos
  const getAllTheVideos = () => {
    getVideos(user.uid).then(setVideos);
  };

  // TODO: make the call to the API to get all the videos on component render
  useEffect(() => {
    getAllTheVideos();
  }, []);

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

export default Videos;
