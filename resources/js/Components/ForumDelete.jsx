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

const ForumDelete = ({ isOpen, onClose, postId }) => {
  const { delete: deletePost, processing } = useForm();
  const { toast } = useToast();

  const onClickDelete = () => {
    deletePost(route('admin.forums.destroy', { forum: postId }), {
      onSuccess: () => {
        toast({
          description: 'Forum deleted successfully!',
        });
        onClose();
      },
      onError: () => {
        toast({
          description: 'Failed to delete forum. Please try again.',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Delete Forum</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-md">
            Are you sure you want to delete this forum? This action cannot be
            undone.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onClickDelete}
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

export default ForumDelete;
