import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div style={styles.loaderContainer}>
      <h2 style={styles.loadingText}>Loading...</h2>
      <PropagateLoader size={15} color="#ffffff" loading={true} />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000814', 
  },
  loadingText: {
    color: '#ffffff',
    marginBottom: '20px',
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500',
  },
};

export default Loading;
