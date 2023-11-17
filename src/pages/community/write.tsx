import { useForm } from 'react-hook-form';
import Button from '../../../components/button';
import Layout from '../../../components/layout';
import TextArea from '../../../components/textArea';
import useMutation from '../../../libs/client/useMutation';
import { useEffect } from 'react';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import useCoords from '../../../libs/client/useCoords';

interface WriteForm {
  question: string;
}

interface WirteResponse {
  ok: boolean;
  post: Post;
}

export default function Write() {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WirteResponse>('/api/posts');
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout title="질문 작성" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-16 space-y-4">
        <TextArea
          register={register('question', { required: true, minLength: 5 })}
          required
          placeholder="질문을 남겨주세요."
        />
        <Button text={loading ? 'loading...' : '완료'} />
      </form>
    </Layout>
  );
}
