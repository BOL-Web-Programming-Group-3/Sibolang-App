import ForumCard from '@/Components/ForumCard';
import ForumCreate from '@/Components/ForumCreate';
import { Button } from '@/Components/ui/button';
import HomeLayout from '@/Layouts/HomeLayout';

export default function Forum() {
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
            <ForumCreate />
          </div>
          <ForumCard />
        </div>
      </div>
    </HomeLayout>
  );
}
