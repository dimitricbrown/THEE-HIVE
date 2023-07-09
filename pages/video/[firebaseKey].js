import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleVideo } from '../../api/videoData';

export default function ViewVideo() {
  const [videos, setVideo] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVideo(firebaseKey).then(setVideo);
  }, [firebaseKey]);

  return (
    <div className="signIn">
      <iframe
        className="signInVid"
      // style={{ height: '600px', width: '100%' }}
        src={`https://www.youtube.com/embed/${videos.video}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
