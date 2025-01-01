import ForumCard from '@/Components/ForumCard';
import HomeLayout from '@/Layouts/HomeLayout';

export default function ForumDetail() {
  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col gap-4">
          <ForumCard isDetail />
        </div>
      </div>
    </HomeLayout>
  );
}
