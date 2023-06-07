import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createImage, updateImage } from '../../api/photoData';

const initialState = {
  image: '',
  description: '',
  isDestiny: false,
};

function ImageForm({ obj }) {
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
      updateImage(formInput)
        .then(() => router.push('/photos'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createImage(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateImage(patchPayload).then(() => {
          router.push('/photos');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Image</h2>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD IMAGE URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Image Description" className="mb-3">
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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Image</Button>
    </Form>
  );
}

ImageForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

ImageForm.defaultProps = {
  obj: initialState,
};

export default ImageForm;
