import PostCard from '@/Components/PostCard';
import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';

const AdminCultureDetail = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <PostCard isDetail isAdmin />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCultureDetail;
