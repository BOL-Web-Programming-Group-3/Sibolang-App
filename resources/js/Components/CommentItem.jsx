import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/Components/ui/button';

const CommentItem = () => {
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Nabila Nurbani</AvatarFallback>
          </Avatar>
          <p className="text-md font-medium">Nabila Nurbani</p>
        </div>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="w-4 h-4" />
        </Button>
      </div>
      <p className="mt-2">
        Luar biasa! Saya pernah menonton Tari Kecak di Uluwatu, pengalaman yang
        sangat berkesan. Semoga budaya seperti ini terus dilestarikan!
      </p>
    </div>
  );
};

export default CommentItem;
