/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleImage } from '../../api/photoData';

export default function ViewImage() {
  const [images, setImage] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleImage(firebaseKey).then(setImage);
  }, [firebaseKey]);

  return (
    <div>
      <img src={images.image} alt={images.description} style={{ width: '650px' }} />
    </div>
  );
}
