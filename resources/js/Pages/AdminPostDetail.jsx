import PostCard from '@/Components/PostCard';
import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';

const AdminPostDetail = ({ post }) => {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <PostCard isDetail isAdmin post={post} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPostDetail;
