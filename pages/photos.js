/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getImages } from '../api/photoData';
import ImageCard from '../components/PhotoCard';

function Images({ isDestiny }) {
  // TODO: Set a state for images
  const [images, setImages] = useState([]);

  // TODO: create a function that makes the API call to get all the images
  const getAllTheImages = () => {
    getImages().then((fetchedImages) => {
      if (isDestiny) {
        setImages(fetchedImages.filter((image) => image.isDestiny === true));
      } else {
        setImages(fetchedImages.filter((image) => image.isDestiny === false));
      }
    });
  };

  // TODO: make the call to the API to get all the images on component render
  useEffect(() => {
    getAllTheImages();
  }, [isDestiny]);

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

Images.propTypes = {
  isDestiny: PropTypes.bool.isRequired,
};

export default Images;
