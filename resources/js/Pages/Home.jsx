import PostCard from '@/Components/PostCard';
import { Button } from '@/Components/ui/button';
import HomeLayout from '@/Layouts/HomeLayout';

export default function Home() {
  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">Posts</p>
              <span>
                Discover and share stories about our rich cultural heritage.
              </span>
            </div>
            <Button>Create Post</Button>
          </div>
          <PostCard />
          <PostCard />
        </div>
      </div>
    </HomeLayout>
  );
}
