import PostCard from '@/Components/PostCard';
import HomeLayout from '@/Layouts/HomeLayout';

export default function Home() {
  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <PostCard />
          <PostCard />
        </div>
      </div>
    </HomeLayout>
  );
}
