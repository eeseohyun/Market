import { useRouter } from 'next/router';
import Button from '../../../components/button';
import Layout from '../../../components/layout';
import TextArea from '../../../components/textArea';
import useSWR from 'swr';
import Link from 'next/link';
import { Answer, Post, User } from '@prisma/client';
import useMutation from '../../../libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface AnswerWithUser extends Answer {
  user: User;
}
interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wonder: number;
  };
  answers: AnswerWithUser[];
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondered: boolean;
}

interface AnswerReply {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  response: Answer;
}

export default function CommunityPostDetail() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerReply>();
  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [wonder, { loading }] = useMutation(
    `/api/posts/${router.query.id}/wonder`
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answers`);
  const onWonderClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data?.post,
          _count: {
            ...data?.post._count,
            wonder: data?.isWondered
              ? data?.post._count.wonder - 1
              : data?.post._count.wonder + 1,
          },
        },
        isWondered: !data.isWondered,
      },
      false
    ); // 캐시에 있는 데이터를 업데이트와 동시에 api에 그 데이터가 맞는지 확인하는 요청도 보냄
    if (!loading) {
      wonder({});
    }
  };
  const onValid = (form: AnswerReply) => {
    if (answerLoading) return;
    sendAnswer(form);
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset, mutate]);
  return (
    <Layout title="Q&A" canGoBack>
      <div className="py-16">
        <span className="inline-flex my-2.5 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네 질문
        </span>
        <div className="flex py-3 mb-3 px-4 border-b items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.post.user.name}
            </p>
            <Link
              href={`/users/profiles/${data?.post?.user?.id}`}
              className="text-xs font-medium text-gray-400 cursor-pointer"
            >
              View Profile &rarr;
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 text-gray-700 ml-4">
            <span className="text-orange-500 font-medium">Q.</span>
            {data?.post?.question}
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
            <button
              onClick={onWonderClick}
              className={`flex space-x-2 items-center text-sm ${
                data?.isWondered ? 'text-green-600' : ''
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                궁금해요{' '}
                {data?.post._count.wonder === 0 ? 0 : data?.post._count.wonder}
              </span>
            </button>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>
                답변{' '}
                {data?.post._count.answers === 0
                  ? 0
                  : data?.post._count.answers}
              </span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {data?.post.answers.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <span className="text-sm block font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="text-xs text-gray-500 block">
                  {answer.createdAt + ''}
                </span>
                <span className="text-gray-700 mt-2">{answer.answer}</span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <TextArea
            register={register('answer', { required: true, minLength: 5 })}
            name="description"
            placeholder="답변을 남겨주세요."
            required
          />
          <Button text={answerLoading ? 'loading' : '완료'} />
        </form>
      </div>
    </Layout>
  );
}
