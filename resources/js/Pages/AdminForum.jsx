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
import PostCreate from '@/Components/PostCreate';
import { Inertia } from '@inertiajs/inertia';
import PostApprove from '@/Components/PostApprove';
import PostReject from '@/Components/PostReject';
import PostDelete from '@/Components/PostDelete';

const AdminForum = ({ posts }) => {
  const [approveModal, setApproveModal] = useState({
    isOpen: false,
    postId: null,
  });

  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    postId: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    postId: null,
  });

  const getBadgeVariant = (status) => {
    if (status === 'published') return 'success';
    if (status === 'rejected') return 'destructive';
    return 'outline';
  };

  const getBadgeText = (status) => {
    if (status === 'published') return 'Published';
    if (status === 'rejected') return 'Rejected';
    return 'Pending';
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
        <PostCreate />
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
          {posts?.map((post, index) => (
            <TableRow key={post?.id}>
              <TableHead className="font-medium">{index + 1}</TableHead>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{post?.user?.name}</AvatarFallback>
                  </Avatar>
                  <p className="texet-md font-medium">{post?.user?.name}</p>
                </div>
              </TableCell>
              <TableCell>{post?.title}</TableCell>
              <TableCell className="max-w-[300px]">
                {post?.content.slice(0, 40)}...
              </TableCell>
              <TableHead>
                <Badge variant={getBadgeVariant(post?.status)}>
                  {getBadgeText(post?.status)}
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
                      onClick={() => Inertia.visit(`/admin/forums/${post?.id}`)}
                    >
                      View Detail
                    </DropdownMenuItem>
                    {post?.status === 'pending' && (
                      <>
                        <DropdownMenuItem
                          onClick={() =>
                            setApproveModal({
                              isOpen: true,
                              postId: post?.id,
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
                              postId: post?.id,
                            })
                          }
                        >
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        setDeleteModal({
                          isOpen: true,
                          postId: post?.id,
                        })
                      }
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {approveModal.isOpen && (
        <PostApprove
          isOpen={approveModal.isOpen}
          postId={approveModal.postId}
          onClose={() => setApproveModal({ isOpen: false, postId: null })}
        />
      )}

      {rejectModal.isOpen && (
        <PostReject
          isOpen={rejectModal.isOpen}
          postId={rejectModal.postId}
          onClose={() => setRejectModal({ isOpen: false, postId: null })}
        />
      )}

      {deleteModal.isOpen && (
        <PostDelete
          isOpen={deleteModal.isOpen}
          postId={deleteModal.postId}
          onClose={() => setDeleteModal({ isOpen: false, postId: null })}
        />
      )}
    </AdminLayout>
  );
};

export default AdminForum;
