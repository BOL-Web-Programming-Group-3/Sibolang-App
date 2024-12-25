import React from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/Components/ui/dialog';

const ApproveCulture = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Approve Culture</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-md">
            Are you sure you want to approve this culture for publication? Once
            you click Submit, this culture will be published and visible to
            other users.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button">Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveCulture;
