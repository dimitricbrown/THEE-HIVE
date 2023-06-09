import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAward, updateAward } from '../../api/awardData';

const initialState = {
  title: '',
  presenter: '',
  year: '',
  isDestiny: false,
};

function AwardForm({ obj }) {
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
      updateAward(formInput)
        .then(() => router.push('/awards'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAward(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAward(patchPayload).then(() => {
          router.push('/awards');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Award</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Award's Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD TITLE"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRESENTER INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Award Presenter" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD PRESENTER"
          name="presenter"
          value={formInput.presenter}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* YEAR INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Award Year Release" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD YEAR RECEIVED"
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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Award</Button>
    </Form>
  );
}

AwardForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    presenter: PropTypes.string,
    year: PropTypes.string,
    isDestiny: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

AwardForm.defaultProps = {
  obj: initialState,
};

export default AwardForm;
