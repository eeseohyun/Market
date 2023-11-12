import { useForm } from 'react-hook-form';
import Button from '../../../components/button';
import Input from '../../../components/input';
import Layout from '../../../components/layout';
import TextArea from '../../../components/textArea';
import useMutation from '../../../libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Items } from '@prisma/client';

interface UploadProps {
  name: string;
  price: number;
  description: string;
}

interface UploadMutation {
  ok: boolean;
  item: Items;
}

export default function Upload() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadProps>();
  const [uploadItem, { loading, data }] =
    useMutation<UploadMutation>('/api/items');
  const onValid = (data: UploadProps) => {
    if (loading) return;
    uploadItem(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/items/${data.item.id}`);
    }
  }, [data, router]);
  return (
    <Layout title="상품 업로드" canGoBack>
      <form className="px-4 py-16 space-y-5" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="w-full cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md text-gray-500 hover:text-gray-600 hover:border-gray-600">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          register={register('name', {
            required: true,
          })}
          label="상품명"
          name="name"
          kind="text"
          type="text"
        />
        <Input
          register={register('price', {
            required: true,
          })}
          label="가격"
          name="price"
          kind="price"
          type="number"
        />
        <TextArea
          register={register('description', {
            required: true,
          })}
          name="description"
          label="설명"
        />
        <Button text={loading ? 'loading' : '업로드'} />
      </form>
    </Layout>
  );
}
