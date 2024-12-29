import PostCard from '@/Components/PostCard';
import PostCreate from '@/Components/PostCreate';
import HomeLayout from '@/Layouts/HomeLayout';

export default function Home({ posts }) {
  console.log('posts', posts);
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
            <PostCreate />
          </div>
          {posts?.length > 0 &&
            posts?.map((post) => <PostCard key={post?.id} post={post} />)}
        </div>
      </div>
    </HomeLayout>
  );
}
