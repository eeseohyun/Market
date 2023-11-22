import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import useSWR from 'swr';
import { Stream } from '@prisma/client';
import Message from '../../../components/message';
import { useForm } from 'react-hook-form';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { useEffect, useRef } from 'react';

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}

interface MessageProps {
  message: string;
}

export default function Stream() {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );
  const { register, handleSubmit, reset } = useForm<MessageProps>();
  const onValid = (form: MessageProps) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              { id: Date.now(), message: form.message, user: { ...user } },
            ],
          },
        } as any),
      false
    );
    sendMessage(form);
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 space-y-4">
        <div className="w-full rounded-md shadow-md bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h3 className="text-gray-800 font-bold text-2xl mt-2">
            {data?.stream?.name}
          </h3>
          <span className="text-2xl block mt-3 text-gray-800">
            {data?.stream?.price}
          </span>
          <p className="my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Live Chat</h2>
          <div className="py-10 pb-16 px-4 space-y-4 h-[50vh] overflow-y-scroll">
            {data?.stream.messages.map((message) => (
              <>
                <Message
                  key={message.id}
                  message={message.message}
                  reversed={message.user.id === user?.id}
                />
                <div ref={scrollRef} />
              </>
            ))}
          </div>
          <div className="fixed py-2 bg-white w-full bottom-0 inset-x-0">
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex relative items-center max-w-md w-full mx-auto"
            >
              <input
                type="text"
                {...register('message', {
                  required: true,
                })}
                className="shadow-sm w-full rounded-full border-gray-300 focus:ring-orange-500 focus:border-orange-500 focus:outline-none pr-12"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex items-center bg-orange-500 rounded-full px-3 text-sm text-white hover:bg-orange-600 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
