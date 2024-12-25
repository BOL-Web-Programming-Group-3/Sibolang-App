import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { EllipsisVertical } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import PostCreate from '@/Components/PostCreate';
import { Inertia } from '@inertiajs/inertia';

const AdminCulture = () => {
  const listCulture = [
    {
      id: 1,
      createdBy: 'Ashandi Leonadi',
      cultureName: 'Batik Indonesia',
      category: 'Category',
      origin: 'Indonesia',
      description: 'Batik merupakan budaya Indonesia...',
      status: 'Published',
    },
    {
      id: 2,
      createdBy: 'Ashandi Leonadi',
      cultureName: 'Batik Indonesia',
      category: 'Category',
      origin: 'Indonesia',
      description: 'Batik merupakan budaya Indonesia...',
      status: 'Rejected',
    },
    {
      id: 3,
      createdBy: 'Ashandi Leonadi',
      cultureName: 'Batik Indonesia',
      category: 'Category',
      origin: 'Indonesia',
      description: 'Batik merupakan budaya Indonesia...',
      status: 'Waiting Approval',
    },
  ];

  const getBadgeVariant = (status) => {
    if (status === 'Published') return 'success';
    if (status === 'Rejected') return 'destructive';
    return 'outline';
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-lg font-medium">Posts</p>
          <span>Manage and review all user-submitted posts in the system.</span>
        </div>
        <PostCreate />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Culture Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listCulture.map((culture, index) => (
            <TableRow key={culture.id}>
              <TableHead className="font-medium">{index + 1}</TableHead>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{culture.createdBy}</AvatarFallback>
                  </Avatar>
                  <p className="texet-md font-medium">{culture.createdBy}</p>
                </div>
              </TableCell>
              <TableCell>{culture.cultureName}</TableCell>
              <TableCell>{culture.category}</TableCell>
              <TableCell>{culture.origin}</TableCell>
              <TableCell className="max-w-[300px]">
                {culture.description}
              </TableCell>
              <TableHead>
                <Badge variant={getBadgeVariant(culture.status)}>
                  {culture.status}
                </Badge>
              </TableHead>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => Inertia.visit('/admin/cultures/1')}
                    >
                      View Detail
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default AdminCulture;
