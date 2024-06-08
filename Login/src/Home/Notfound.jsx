import React from 'react';
import NavBar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

import './styles/NotFound.css';

const Notfound = () => {
  return (
    <>
      <NavBar />
      <div className="not-found-container container">
        <h1 className="not-found-message">
          Requested Url not Found. Contact Satvik.
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default Notfound;
