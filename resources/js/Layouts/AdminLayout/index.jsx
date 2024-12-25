import React from 'react';
import Header from './Header';

const AdminLayout = ({ children }) => {
  return (
    <div className="pb-10">
      <Header />
      <main className="container mx-auto max-w-6xl pt-6 px-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
