import ForumCard from '@/Components/ForumCard';
import ForumCreate from '@/Components/ForumCreate';
import HomeLayout from '@/Layouts/HomeLayout';
import { usePage } from '@inertiajs/react';

export default function Forum({ posts }) {
  const {
    props: {
      auth: { user },
    },
  } = usePage(); // Get the current URL

  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <div className="flex justify-between items-center gap-6">
            <div>
              <p className="text-lg font-medium">Forums</p>
              <span>
                Discuss culture, traditions, and heritage with community.
              </span>
            </div>
            {user && <ForumCreate isAdmin={false} />}
          </div>
          {posts?.length > 0 &&
            posts?.map((post) => <ForumCard key={post?.id} post={post} />)}
        </div>
      </div>
    </HomeLayout>
  );
}
