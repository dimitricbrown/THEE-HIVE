/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getImages } from '../api/photoData';
import ImageCard from '../components/PhotoCard';

function Images() {
  // TODO: Set a state for images
  const [images, setImages] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the images
  const getAllTheImages = () => {
    getImages(user.uid).then(setImages);
  };

  // TODO: make the call to the API to get all the images on component render
  useEffect(() => {
    getAllTheImages();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/photo/new" passHref>
        <Button>Add A Photo</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over images here using ImageCard component */}
        {images.map((image) => (
          <ImageCard key={image.firebaseKey} imageObj={image} onUpdate={getAllTheImages} />
        ))}
      </div>
    </div>
  );
}

export default Images;
