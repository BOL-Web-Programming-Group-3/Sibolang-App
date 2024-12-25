import AdminLayout from '@/Layouts/AdminLayout';
import React, { useState } from 'react';
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
import ForumCreate from '@/Components/ForumCreate';
import { Inertia } from '@inertiajs/inertia';
import ForumApprove from '@/Components/ForumApprove';
import ForumReject from '@/Components/ForumReject';

const AdminForum = () => {
  const [approveModal, setApproveModal] = useState({
    isOpen: false,
    forumId: null,
  });

  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    forumId: null,
  });

  const listForum = [
    {
      id: 1,
      createdBy: 'Ashandi Leonadi',
      forumName: 'Batik Indonesia',
      category: 'Category',
      origin: 'Indonesia',
      description: 'Batik merupakan budaya Indonesia...',
      status: 'Approved',
    },
    {
      id: 2,
      createdBy: 'Ashandi Leonadi',
      forumName: 'Batik Indonesia',
      category: 'Category',
      origin: 'Indonesia',
      description: 'Batik merupakan budaya Indonesia...',
      status: 'Rejected',
    },
    {
      id: 3,
      createdBy: 'Ashandi Leonadi',
      forumName: 'Batik Indonesia',
      category: 'Category',
      origin: 'Indonesia',
      description: 'Batik merupakan budaya Indonesia...',
      status: 'Waiting Approval',
    },
  ];

  const getBadgeVariant = (status) => {
    if (status === 'Approved') return 'success';
    if (status === 'Rejected') return 'destructive';
    return 'outline';
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-lg font-medium">Forums</p>
          <span>
            Manage and review all user-submitted forums in the system.
          </span>
        </div>
        <ForumCreate />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listForum.map((forum, index) => (
            <TableRow key={forum.id}>
              <TableHead className="font-medium">{index + 1}</TableHead>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{forum.createdBy}</AvatarFallback>
                  </Avatar>
                  <p className="texet-md font-medium">{forum.createdBy}</p>
                </div>
              </TableCell>
              <TableCell>{forum.forumName}</TableCell>
              <TableCell>{forum.category}</TableCell>
              <TableHead>
                <Badge variant={getBadgeVariant(forum.status)}>
                  {forum.status}
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
                      onClick={() => Inertia.visit('/admin/forums/1')}
                    >
                      View Detail
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        setApproveModal({
                          isOpen: true,
                          forumId: forum.id,
                        })
                      }
                    >
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        setRejectModal({
                          isOpen: true,
                          forumId: forum.id,
                        })
                      }
                    >
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ForumApprove
        isOpen={approveModal.isOpen}
        forumId={approveModal.forumId}
        onClose={() => setApproveModal({ isOpen: false, forumId: null })}
      />

      <ForumReject
        isOpen={rejectModal.isOpen}
        forumId={rejectModal.forumId}
        onClose={() => setRejectModal({ isOpen: false, forumId: null })}
      />
    </AdminLayout>
  );
};

export default AdminForum;
