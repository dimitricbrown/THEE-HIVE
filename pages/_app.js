/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { useState } from 'react';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  const [isDestiny, setIsDestiny] = useState(false);

  const toggleDestiny = () => {
    setIsDestiny((prevIsDestiny) => !prevIsDestiny);
  };

  return (
    <>
      <AuthProvider>
        <ViewDirectorBasedOnUserAuthStatus
          component={Component}
          pageProps={pageProps}
          isDestiny={isDestiny}
          toggleDestiny={toggleDestiny}
        />
      </AuthProvider>
    </>
  );
}

export default MyApp;
