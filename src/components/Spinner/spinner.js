import React from 'react';
import './spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner-text">Загружаем данные...</div>
      <div className="spinner-loader">
        <div className="loader">
          <div className="inner one" />
          <div className="inner two" />
          <div className="inner three" />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
