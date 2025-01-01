import React from 'react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { useForm } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';

const ForumVote = ({ postId, post }) => {
  const { upvotes_count = 0, downvotes_count = 0 } = post || {};

  const {
    data,
    setData,
    post: postData,
    processing,
  } = useForm({
    vote: null, // Tracks upvote or downvote state
    postId, // Associating the vote with the specific post
  });
  const { toast } = useToast();

  // Toggle vote (up or down)
  const toggleVote = (type) => {
    const currentVote = data.vote;

    if (currentVote === type) {
      // Remove vote if already selected
      setData('vote', null);
      toast({
        description: `${type === 'up' ? 'Upvote' : 'Downvote'} removed!`,
      });
    } else {
      // Set new vote (upvote or downvote)
      setData('vote', type);
      toast({
        description: `${type === 'up' ? 'Upvoted' : 'Downvoted'} successfully!`,
      });
    }

    const routeName =
      type === 'up' ? 'user.posts.upvote' : 'user.posts.downvote';

    // Immediately send the vote to the backend
    postData(route(routeName, { id: data.postId }), {
      data: {
        vote: data.vote,
      },
      onSuccess: (data) => {
        console.log('Data', data);
        toast({
          description: 'Your vote has been recorded.',
        });
      },
      onError: () => {
        toast({
          description: 'An error occurred while recording your vote.',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleVote('up')}
          disabled={processing}
        >
          <ArrowBigUp className="w-4 h-4" />
        </Button>
        <p>{upvotes_count}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleVote('down')}
          disabled={processing}
        >
          <ArrowBigDown className="w-4 h-4" />
        </Button>
        <p>{downvotes_count}</p>
      </div>
    </>
  );
};

export default ForumVote;
