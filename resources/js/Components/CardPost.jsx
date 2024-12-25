import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/Components/ui/button';

const CardPost = () => {
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
        <div className="rounded overflow-hidden w-full h-96">
          <img
            src="https://www.batiksimonet.id/wp-content/uploads/2024/02/4c073744-3d6c-4bb1-97f6-4aa35f8c0d47.webp"
            className="w-full h-full"
          />
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium mb-3">Muhammad Faza</p>
          <p className="">
            Tari Kecak adalah salah satu tarian tradisional paling terkenal dari
            Bali. Tarian ini tidak menggunakan alat musik, melainkan suara
            paduan suara "cak cak cak" dari para penarinya. Tari Kecak biasanya
            menggambarkan cerita epik Ramayana, terutama kisah tentang Hanuman
            dan penculikan Dewi Sinta oleh Rahwana.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">View Detail</Button>
      </CardFooter>
    </Card>
  );
};

export default CardPost;
