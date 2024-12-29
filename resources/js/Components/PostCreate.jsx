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

export default function PostCreate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    content: '',
    image: null, // Add image field to the form data
  });
  const { toast } = useToast();

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a FormData object
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.image) {
      formData.append('image', data.image); // Append the image file if it exists
    }

    post(route('posts.store'), {
      data: formData, // Pass the FormData object
      onSuccess: () => {
        reset();
        toast({
          description: 'Post created successfully!',
        });
        setIsModalOpen(false); // Close the modal on success
      },
    });
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger>
          <Button onClick={() => setIsModalOpen(true)}>Create Post</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Express your insights and stories about cultural traditions,
                heritage, and art.
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
                  placeholder="Enter the title of the cultural art"
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
                  placeholder="Provide a brief description of the cultural art"
                  className="mt-1 block w-full"
                  autoComplete="off"
                  onChange={(e) => setData('content', e.target.value)}
                />
                <InputError message={errors.content} className="mt-2" />
              </div>

              {/* Image Field */}
              <div>
                <InputLabel htmlFor="image" value="Image" />
                <Input
                  id="image"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  autoComplete="off"
                  onChange={(e) => setData('image', e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={processing}>
                {processing ? 'Submitting...' : 'Create Post'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
