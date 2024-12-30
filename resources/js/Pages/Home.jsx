import React, { useEffect } from 'react';

import { usePage } from '@inertiajs/react';

const Home = () => {
  const {
    url,
    props: {
      auth: { user },
    },
  } = usePage(); // Get the current URL

  useEffect(() => {
    if (!user) return;
    if (user?.email === 'administrator@sibolang.com') {
      window.location.href = '/admin/posts';
    } else {
      window.location.href = '/posts';
    }
  }, [user]);

  return <></>;
};

export default Home;
