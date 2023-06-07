import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleImage } from '../../../api/photoData';
import ImageForm from '../../../components/forms/ImageForm';

export default function EditImage() {
  const [editImage, setEditImage] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleImage(firebaseKey).then(setEditImage);
  }, [firebaseKey]);

  return (<ImageForm obj={editImage} />);
}
