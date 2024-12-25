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
import CommentItem from './CommentItem';
import AddComment from './AddComment';

const ForumCard = ({ isDetail = false }) => {
  const itemId = 1; // FIXME: Change this to dynamic value
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
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <p>3</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ForumCard;
