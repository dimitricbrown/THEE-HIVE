import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleAward } from '../../../api/awardData';
import AwardForm from '../../../components/forms/AwardForm';

export default function EditAward() {
  const [editAward, setEditAward] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAward(firebaseKey).then(setEditAward);
  }, [firebaseKey]);

  return (<AwardForm obj={editAward} />);
}
