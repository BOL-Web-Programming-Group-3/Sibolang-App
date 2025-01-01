import ForumCard from '@/Components/ForumCard';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminForumDetail({ post }) {
  return (
    <AdminLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <ForumCard isDetail isAdmin post={post} />
        </div>
      </div>
    </AdminLayout>
  );
}
