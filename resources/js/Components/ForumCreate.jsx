import React, { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/Components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ForumCreate({ isAdmin = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    content: '',
  });
  const { toast } = useToast();

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a FormData object
    formData.append('title', data.title);
    formData.append('content', data.content);

    post(route(isAdmin ? 'admin.forums.store' : 'user.forums.store'), {
      data: formData, // Pass the FormData object
      onSuccess: () => {
        reset();
        toast({
          description: 'Forum created successfully!',
        });
        setIsModalOpen(false); // Close the modal on success
      },
    });
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger>
          <Button onClick={() => setIsModalOpen(true)}>Create Forum</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>Create Forum</DialogTitle>
              <DialogDescription>
                Start a new discussion to explore and share perspectives on
                culture and heritage.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Title Field */}
              <div>
                <InputLabel htmlFor="title" value="Title" />
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={data.title}
                  className="mt-1 block w-full"
                  autoComplete="off"
                  onChange={(e) => setData('title', e.target.value)}
                  placeholder="Enter the topic of discussion"
                />
                <InputError message={errors.title} className="mt-2" />
              </div>

              {/* Content Field */}
              <div>
                <InputLabel htmlFor="content" value="Content" />
                <Textarea
                  id="content"
                  name="content"
                  value={data.content}
                  placeholder="Write the content of your discussion"
                  className="mt-1 block w-full"
                  autoComplete="off"
                  onChange={(e) => setData('content', e.target.value)}
                />
                <InputError message={errors.content} className="mt-2" />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={processing}>
                {processing ? 'Submitting...' : 'Create Forum'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
