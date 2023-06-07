import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleVideo } from '../../../api/videoData';
import VideoForm from '../../../components/forms/VideoForm';

export default function EditVideo() {
  const [editVideo, setEditVideo] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVideo(firebaseKey).then(setEditVideo);
  }, [firebaseKey]);

  return (<VideoForm obj={editVideo} />);
}
