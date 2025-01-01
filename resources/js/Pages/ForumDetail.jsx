import ForumCard from '@/Components/ForumCard';
import HomeLayout from '@/Layouts/HomeLayout';

export default function ForumDetail({ post, comments }) {
  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <ForumCard isDetail post={post} comments={comments} />
        </div>
      </div>
    </HomeLayout>
  );
}
