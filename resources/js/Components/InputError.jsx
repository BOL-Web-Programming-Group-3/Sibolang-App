import { cn } from '@/lib/utils';

export default function InputError({ message, className = '', ...props }) {
  return message ? (
    <p
      className={cn('text-[0.8rem] font-medium text-destructive', className)}
      {...props}
    >
      {message}
    </p>
  ) : null;
}
