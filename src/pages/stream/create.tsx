import { useForm } from 'react-hook-form';
import Button from '../../../components/button';
import Input from '../../../components/input';
import Layout from '../../../components/layout';
import TextArea from '../../../components/textArea';
import useMutation from '../../../libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface StreamProps {
  name: string;
  price: string;
  description: string;
}

interface StreamResponse {
  ok: boolean;
  stream: Stream;
}

export default function Create() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<StreamProps>();
  const [createStream, { data, loading }] =
    useMutation<StreamResponse>(`/api/streams`);
  const onValid = (form: StreamProps) => {
    if (loading) return;
    createStream(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/stream/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <Layout title="라이브 방송 시작" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-16 px-4 space-y-5">
        <Input
          register={register('name', { required: true })}
          label="상품명"
          name="name"
          kind="text"
          type="text"
        />

        <Input
          register={register('price', { required: true, valueAsNumber: true })}
          label="가격"
          name="price"
          kind="price"
          type="number"
        />
        <TextArea
          register={register('description', { required: true })}
          name="description"
          label="설명"
        />

        <Button text="Go Live" loading={loading} />
      </form>
    </Layout>
  );
}
