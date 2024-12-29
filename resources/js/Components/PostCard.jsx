import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/inertia-react';
import CommentItem from './CommentItem';
import AddComment from './AddComment';
import ConditionalWrapper from './ConditionalWrapper';

const PostCard = ({ isDetail = false, isAdmin = false, post }) => {
  const { id, status, user, content, image } = post || {};

  const getBadgeVariant = () => {
    if (status === 'published') return 'success';
    if (status === 'rejected') return 'destructive';
    return 'outline';
  };

  const getBadgeText = () => {
    if (status === 'published') return 'Published';
    if (status === 'rejected') return 'Rejected';
    return 'Pending';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
            <p className="text-md font-medium">{user?.name}</p>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <Badge variant={getBadgeVariant()}>{getBadgeText()}</Badge>
              {status === 'waiting_approval' && (
                <>
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="destructive">
                    Reject
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <ConditionalWrapper
        condition={!isDetail}
        wrapper={(children) => <Link href={`/posts/${id}`}>{children}</Link>}
      >
        <CardContent>
          {image && (
            <div className="rounded overflow-hidden w-full h-96">
              <img
                src={`/storage/${image}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="mt-3">
            <p className="mb-3">{user?.name}</p>
            <p>{content}</p>
          </div>
        </CardContent>
      </ConditionalWrapper>
      <CardFooter className="flex flex-col items-start">
        {isDetail ? (
          <>
            <div className="border-0 border-t border-solid border-gray-200 w-full" />
            <div className="mt-4 flex flex-col gap-6">
              <CommentItem />
              <CommentItem />
              <CommentItem />
              <AddComment />
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href={`/posts/${id}`}>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </Link>
              <p>3</p>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
