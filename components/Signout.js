import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function Signout() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <Button type="button" size="lg" className="copy-btn" onClick={signOut}>
        BUZZ OUT
      </Button>
    </div>
  );
}
