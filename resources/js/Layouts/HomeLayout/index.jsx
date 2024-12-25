import React from 'react';
import Header from './Header';

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
