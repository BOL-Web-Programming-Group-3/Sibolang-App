'use client';

import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import InputLabel from '@/Components/InputLabel';
import { Textarea } from '@/Components/ui/textarea';
import InputError from '@/Components/InputError';

const CommentAdd = ({ postId }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    post_id: postId,
    content: '', // Default value for the content field
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object
    formData.append('post_id', data.post_id);
    formData.append('content', data.content);

    post('/comments', {
      data: formData,
      onSuccess: () => {
        reset(); // Reset the form after success
      },
      onError: (err) => {
        console.error(err); // Log errors if any
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputLabel htmlFor="comment" value="Add Comment" />
        <Textarea
          id="comment"
          name="comment"
          value={data.content}
          placeholder="Write your comment here..."
          className="mt-1 block w-full min-h-24"
          autoComplete="off"
          onChange={(e) => setData('content', e.target.value)}
        />
        <InputError message={errors.content} className="mt-2" />
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={!data.content || processing}>
          Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentAdd;
