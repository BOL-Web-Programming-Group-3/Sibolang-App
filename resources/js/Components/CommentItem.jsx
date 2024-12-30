import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useToast } from '@/hooks/use-toast';

const CommentItem = ({ comment }) => {
  const { delete: deleteComment, processing } = useForm();
  const { toast } = useToast();

  const onClickDelete = () => {
    deleteComment(route('comments.destroy', { comment: comment?.id }), {
      onSuccess: () => {
        toast({
          description: 'Comment deleted successfully!',
        });
      },
      onError: () => {
        toast({
          description: 'Failed to delete comment. Please try again.',
          variant: 'destructive',
        });
      },
    });
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={onClickDelete}
              disabled={processing}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mt-2">{comment?.content}</p>
    </div>
  );
};

export default CommentItem;
