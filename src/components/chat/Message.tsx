import { Message as MessageType } from '@/types/message';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  const { data: session } = useSession();
  const isOwn = session?.user?.email === message.sender.email;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`
          max-w-[70%] 
          rounded-lg 
          p-3 
          ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'}
        `}
      >
        {!isOwn && (
          <p className="text-sm font-semibold mb-1">{message.sender.name}</p>
        )}
        <p>{message.content}</p>
        <p className="text-xs mt-1 opacity-70">
          {format(new Date(message.createdAt), 'p')}
        </p>
      </div>
    </div>
  );
};