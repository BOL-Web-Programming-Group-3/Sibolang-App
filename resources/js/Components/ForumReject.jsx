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

const ForumReject = ({ isOpen, onClose, postId }) => {
  const { data, patch, processing } = useForm({
    id: postId,
    status: 'rejected',
  });
  const { toast } = useToast();

  const updateStatus = () => {
    const formData = new FormData(); // Create a FormData object
    formData.append('id', data.id); // Append the post ID
    formData.append('status', data.status); // Append the new status

    // Send the request using Inertia's patch method
    patch(route('admin.forums.updateStatus'), {
      data: formData, // Pass the FormData object
      onSuccess: () => {
        toast({
          description: 'Forum status updated successfully!',
        });
        onClose();
      },
      onError: () => {
        toast({
          description: 'Failed to update forum status. Please try again.',
          status: 'error',
        });
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Reject Forum</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-md">
            Are you sure you want to reject this forum? Once you click Reject,
            this forum will be rejected and will no longer be visible to other
            users.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={updateStatus} disabled={processing}>
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForumReject;
