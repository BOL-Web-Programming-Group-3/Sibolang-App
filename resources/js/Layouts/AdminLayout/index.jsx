import React from 'react';
import Header from './Header';
import { usePage } from '@inertiajs/react';

const AdminLayout = ({ children }) => {
  const {
    props: {
      auth: { user },
    },
  } = usePage(); // Get the current URL

  console.log('user', user);

  if (user?.email !== 'administrator@sibolang.com') {
    return (
      <div className="pb-10">
        <Header />
        <main className="container mx-auto max-w-6xl pt-6 px-4">
          <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-2xl font-semibold mb-2">
              You are not authorized to access this page.
            </h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <Header />
      <main className="container mx-auto max-w-6xl pt-6 px-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
