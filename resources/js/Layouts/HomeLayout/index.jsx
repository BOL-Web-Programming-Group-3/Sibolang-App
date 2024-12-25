import React from 'react';
import Header from './Header';

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-6xl pt-6">{children}</main>
    </div>
  );
};

export default HomeLayout;
