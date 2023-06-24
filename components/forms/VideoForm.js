import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createVideo, updateVideo } from '../../api/videoData';

const initialState = {
  video: '',
  description: '',
  isDestiny: false,
};

function VideoForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateVideo(formInput)
        .then(() => router.push('/videos'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createVideo(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateVideo(patchPayload).then(() => {
          router.push('/videos');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Video</h2>

      {/* VIDEO URL INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Video URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD VIDEO URL"
          name="video"
          value={formInput.video}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* VIDEO THUMBNAIL INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Video Thumbnail" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD VIDEO THUMBNAIL URL"
          name="thumbnail"
          value={formInput.thumbnail}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Video Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD DESCRIPTION"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="isDestiny"
        name="isDestiny"
        label="Part of Destiny's Child Catalog?"
        checked={formInput.isDestiny}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            isDestiny: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Video</Button>
    </Form>
  );
}

VideoForm.propTypes = {
  obj: PropTypes.shape({
    video: PropTypes.string,
    thumbnail: PropTypes.string,
    description: PropTypes.string,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

VideoForm.defaultProps = {
  obj: initialState,
};

export default VideoForm;
