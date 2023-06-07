import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAlbum, updateAlbum } from '../../api/albumData';

const initialState = {
  title: '',
  image: '',
  year: '',
  isDestiny: false,
};

function AlbumForm({ obj }) {
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
      updateAlbum(formInput)
        .then(() => router.push(`/album/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAlbum(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAlbum(patchPayload).then(() => {
          router.push('/albums');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Album</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Album's Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD TITLE"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Album Cover" className="mb-3">
        <Form.Control
          type="url"
          placeholder="ADD IMAGE URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* YEAR INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Album Year Release" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD RELEASE YEAR"
          name="year"
          value={formInput.year}
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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Album</Button>
    </Form>
  );
}

AlbumForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    year: PropTypes.string,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

AlbumForm.defaultProps = {
  obj: initialState,
};

export default AlbumForm;
