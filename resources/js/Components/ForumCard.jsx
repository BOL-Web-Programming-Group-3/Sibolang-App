import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/inertia-react';
import CommentItem from './CommentItem';
import CommentAdd from './CommentAdd';
import ConditionalWrapper from './ConditionalWrapper';
import { Badge } from './ui/badge';
import { usePage } from '@inertiajs/react';
import ForumVote from './ForumVote';
import ForumApprove from './ForumApprove';
import ForumReject from './ForumReject';

const ForumCard = ({ isDetail = false, isAdmin = false, post, comments }) => {
  const { id, status, user, title, content, image, comments_count } =
    post || {};

  const {
    props: {
      auth: { user: authUser },
    },
  } = usePage(); // Get the current URL

  const [approveModal, setApproveModal] = useState({
    isOpen: false,
    postId: null,
  });

  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    postId: null,
  });

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
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
              <p className="text-md font-medium">{user?.name}</p>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-2">
                {status !== 'pending' && (
                  <Badge variant={getBadgeVariant()}>{getBadgeText()}</Badge>
                )}
                {status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        setRejectModal({
                          isOpen: true,
                          postId: post?.id,
                        })
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        setApproveModal({
                          isOpen: true,
                          postId: post?.id,
                        })
                      }
                    >
                      Approve
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <ConditionalWrapper
          condition={!isDetail}
          wrapper={(children) => <Link href={`/forums/${id}`}>{children}</Link>}
        >
          <CardContent>
            {image && (
              <div className="rounded overflow-hidden w-full h-96 bg-gray-100">
                <img
                  src={`/storage/${image}`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="mt-3">
              <p className="mb-3">{title}</p>
              <p>{content}</p>
            </div>
          </CardContent>
        </ConditionalWrapper>

        {status === 'published' && (
          <CardFooter className="flex flex-col items-start">
            {isDetail ? (
              <>
                <div className="flex items-center gap-4">
                  <ForumVote postId={id} post={post} />
                </div>
                <div className="border-0 border-t border-solid border-gray-200 w-full" />
                <div className="mt-4 flex flex-col gap-6 w-full">
                  {comments?.length > 0 &&
                    comments?.map((comment) => (
                      <CommentItem key={comment?.id} comment={comment} />
                    ))}
                  {authUser && <CommentAdd postId={id} />}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <ForumVote postId={id} post={post} />
                <div className="flex items-center gap-1">
                  <Link href={`/forums/${id}`}>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </Link>
                  <p>{comments_count}</p>
                </div>
              </div>
            )}
          </CardFooter>
        )}
      </Card>

      {approveModal.isOpen && (
        <ForumApprove
          isOpen={approveModal.isOpen}
          postId={approveModal.postId}
          onClose={() => setApproveModal({ isOpen: false, postId: null })}
        />
      )}

      {rejectModal.isOpen && (
        <ForumReject
          isOpen={rejectModal.isOpen}
          postId={rejectModal.postId}
          onClose={() => setRejectModal({ isOpen: false, postId: null })}
        />
      )}
    </>
  );
};

export default ForumCard;
