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
import { Badge } from './ui/badge';

const PostCard = ({ isDetail = false, isAdmin = false }) => {
  const itemId = 1; // FIXME: Change this to dynamic value

  const getBadgeVariant = (status) => {
    if (status === 'Published') return 'success';
    if (status === 'Rejected') return 'destructive';
    return 'outline';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Muhammad Faza</AvatarFallback>
            </Avatar>
            <p className="text-md font-medium">Muhammad Faza</p>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2">
              {/* <Badge variant={getBadgeVariant('Published')}>Published</Badge>
              <Badge variant={getBadgeVariant('Rejected')}>Rejected</Badge> */}
              <Button size="sm">Approve</Button>
              <Button size="sm" variant="destructive">
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <ConditionalWrapper
        condition={!isDetail}
        wrapper={(children) => (
          <Link href={`/posts/${itemId}`}>{children}</Link>
        )}
      >
        <CardContent>
          <div className="rounded overflow-hidden w-full h-96">
            <img
              src="https://www.batiksimonet.id/wp-content/uploads/2024/02/4c073744-3d6c-4bb1-97f6-4aa35f8c0d47.webp"
              className="w-full h-full"
            />
          </div>
          <div className="mt-3">
            <p className="mb-3">Muhammad Faza</p>
            <p>
              Tari Kecak adalah salah satu tarian tradisional paling terkenal
              dari Bali. Tarian ini tidak menggunakan alat musik, melainkan
              suara paduan suara "cak cak cak" dari para penarinya. Tari Kecak
              biasanya menggambarkan cerita epik Ramayana, terutama kisah
              tentang Hanuman dan penculikan Dewi Sinta oleh Rahwana.
            </p>
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
              <Link href={`/posts/${itemId}`}>
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
