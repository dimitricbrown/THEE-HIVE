import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleSong } from '../../../api/songData';
import SongForm from '../../../components/forms/SongForm';

export default function EditSong() {
  const [editSong, setEditSong] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleSong(firebaseKey).then(setEditSong);
  }, [firebaseKey]);

  return (<SongForm obj={editSong} />);
}
