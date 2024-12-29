import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/Components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function PostCreate() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    content: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('posts.store'), {
      onFinish: () => reset(),
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Create Post</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Express your insights and stories about cultural traditions,
                heritage, and art.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Title Field */}
              <div>
                <InputLabel htmlFor="title" value="Title" />

                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={data.title}
                  className="mt-1 block w-full"
                  autoComplete="off"
                  onChange={(e) => setData('title', e.target.value)}
                  placeholder="Enter the title of the cultural art"
                />

                <InputError message={errors.title} className="mt-2" />
              </div>

              {/* Content Field */}
              <div>
                <InputLabel htmlFor="content" value="Content" />

                <Textarea
                  id="content"
                  name="content"
                  value={data.content}
                  placeholder="Provide a brief description of the cultural art"
                  className="mt-1 block w-full"
                  autoComplete="off"
                  onChange={(e) => setData('content', e.target.value)}
                />

                <InputError message={errors.content} className="mt-2" />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={processing}>
                Create Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
