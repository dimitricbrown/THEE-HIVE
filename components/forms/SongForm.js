/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createSong, updateSong } from '../../api/songData';
import { getAlbums } from '../../api/albumData';

const initialState = {
  trackNum: '',
  title: '',
  hasFeat: false,
  featureArtist: '',
  isDestiny: false,
};

function SongForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [albums, setAlbums] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAlbums(user.uid).then(setAlbums);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
      updateSong(formInput)
        .then(() => router.push(`/album/${obj.albumId}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSong(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateSong(patchPayload).then(() => {
          router.push(`/album/${formInput.albumId}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Song</h2>

      {/* TRACK NUMBER INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Song's Track Number" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD TRACKNUMBER"
          name="trackNum"
          value={formInput.trackNum}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Song's Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD TITLE"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="hasFeat"
        name="hasFeat"
        label="Add Feature Artist to the Song?"
        checked={formInput.hasFeat}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            hasFeat: e.target.checked,
          }));
        }}
      />

      {/* FEATURE ARTIST INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Song's Feature Artist(s)" className="mb-3">
        <Form.Control
          type="text"
          placeholder="ADD FEATURE ARTIST(S)"
          name="featureArtist"
          value={formInput.featureArtist}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ALBUM SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Album">
        <Form.Select
          aria-label="Album"
          name="albumId"
          onChange={handleChange}
          className="mb-3"
          value={formInput.albumId}
          required
        >
          <option value="">Select an Album</option>
          {
            albums.map((album) => (
              <option
                key={album.firebaseKey}
                value={album.firebaseKey}
              >
                {album.title}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Song</Button>
    </Form>
  );
}

SongForm.propTypes = {
  obj: PropTypes.shape({
    trackNum: PropTypes.string,
    title: PropTypes.string,
    hasFeat: PropTypes.bool,
    featureArtist: PropTypes.any,
    albumId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

SongForm.defaultProps = {
  obj: initialState,
};

export default SongForm;
