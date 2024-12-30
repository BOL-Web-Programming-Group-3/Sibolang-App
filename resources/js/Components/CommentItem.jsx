import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/Components/ui/button';

const CommentItem = ({ comment }) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 w-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{comment?.user?.name}</AvatarFallback>
          </Avatar>
          <p className="text-md font-medium">{comment?.user?.name}</p>
        </div>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="w-4 h-4" />
        </Button>
      </div>
      <p className="mt-2">{comment?.content}</p>
    </div>
  );
};

export default CommentItem;
