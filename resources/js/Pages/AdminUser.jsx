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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/Components/ui/badge';

const AdminUser = ({ users }) => {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-lg font-medium">Users</p>
          <span>Manage and review all active users in the system.</span>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={user?.id}>
              <TableHead className="font-medium">{index + 1}</TableHead>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{user?.name}</AvatarFallback>
                  </Avatar>
                  <p className="texet-md font-medium">{user?.name}</p>
                </div>
              </TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell className="max-w-[300px]">
                {new Date(user?.created_at).toDateString()}
              </TableCell>
              <TableHead>
                <Badge variant="success">Active</Badge>
              </TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default AdminUser;
