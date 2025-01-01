import PostCard from '@/Components/PostCard';
import PostCreate from '@/Components/PostCreate';
import HomeLayout from '@/Layouts/HomeLayout';
import { usePage } from '@inertiajs/react';

export default function Home({ posts }) {
  const {
    props: {
      auth: { user },
    },
  } = usePage(); // Get the current URL

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
            {user && <PostCreate />}
          </div>
          {posts?.length > 0 &&
            posts?.map((post) => <PostCard key={post?.id} post={post} />)}
        </div>
      </div>
    </HomeLayout>
  );
}
