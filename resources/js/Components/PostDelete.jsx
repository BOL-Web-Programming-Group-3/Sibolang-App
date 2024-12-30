import React from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/Components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';

const PostDelete = ({ isOpen, onClose, postId }) => {
  const { delete: deletePost, processing } = useForm();
  const { toast } = useToast();

  const updateStatus = () => {
    deletePost(route('posts.destroy', { post: postId }), {
      onSuccess: () => {
        toast({
          description: 'Post deleted successfully!',
        });
        onClose();
      },
      onError: () => {
        toast({
          description: 'Failed to delete post. Please try again.',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-md">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={updateStatus}
            disabled={processing}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDelete;
