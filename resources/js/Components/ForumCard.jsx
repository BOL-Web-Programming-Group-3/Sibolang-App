import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowBigDown,
  ArrowBigUp,
  EllipsisVertical,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/inertia-react';
import ConditionalWrapper from './ConditionalWrapper';
import CommentItem from './CommentItem';
import AddComment from './AddComment';

const ForumCard = ({ isDetail = false, isAdmin = false }) => {
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
          <Link href={`/forums/${itemId}`}>{children}</Link>
        )}
      >
        <CardContent>
          <div>
            <p className="font-medium mb-3">
              Bagaimana Cara Melibatkan Generasi Muda dalam Pelestarian Tari
              Tradisional?
            </p>
            <p>
              Generasi muda saat ini lebih tertarik dengan budaya populer. Apa
              langkah konkret yang bisa dilakukan untuk menarik perhatian mereka
              pada seni tradisional seperti Tari Kecak atau Tari Saman?
            </p>
          </div>
        </CardContent>
      </ConditionalWrapper>
      <CardFooter className="flex flex-col items-start">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ArrowBigUp className="w-4 h-4" />
            </Button>
            <p>3</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ArrowBigDown className="w-4 h-4" />
            </Button>
            <p>3</p>
          </div>
          {!isDetail && (
            <div className="flex items-center gap-2">
              <Link href={`/forums/${itemId}`}>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </Link>
              <p>3</p>
            </div>
          )}
        </div>

        {isDetail && (
          <>
            <div className="border-0 border-t border-solid border-gray-200 w-full mt-4" />
            <div className="mt-4 flex flex-col gap-6">
              <CommentItem />
              <CommentItem />
              <CommentItem />
              <AddComment />
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ForumCard;
