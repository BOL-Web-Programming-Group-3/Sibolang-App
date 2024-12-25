import React from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from './ui/textarea';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

const PostCreate = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = (data) => {
    //
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Create Post</Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Create Post</DialogTitle>
                <DialogDescription>
                  Express your insights and stories about cultural traditions,
                  heritage, and art.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama seni budaya</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama seni budaya" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori seni budaya</FormLabel>
                      <FormControl>
                        <Input placeholder="Kategori seni budaya" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asal seni budaya</FormLabel>
                      <FormControl>
                        <Input placeholder="Asal seni budaya" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi seni budaya</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Deskripsi seni budaya"
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostCreate;
