import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import fwt from '../assets/fwt.mp4';

function Signin() {
  return (
    <div className="signIn">
      <div className="signInOverlay" />
      <video className="signInVid" src={fwt} autoPlay loop muted />
      <div className="signInContent">
        <h1>THEE HIVE</h1>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
          BUZZ IN
        </Button>
      </div>
    </div>
  );
}

export default Signin;
