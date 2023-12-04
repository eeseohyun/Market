import { useForm } from 'react-hook-form';
import Button from '../../../components/button';
import Input from '../../../components/input';
import Layout from '../../../components/layout';
import useUser from '../../../libs/client/useUser';
import { useEffect, useState } from 'react';
import useMutation from '../../../libs/client/useMutation';

interface EditProfileProps {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

export default function EditProfile() {
  const { user } = useUser();
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/user`);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const [avatarPreview, setAvatarPreview] = useState('');
  useEffect(() => {
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
    if (user?.name) setValue('name', user.name);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/SBlo4UQjj-e8L8lXozu18g/${user?.avatar}/avatar`
      );
  }, [user, setValue]);
  const onValid = async ({ email, phone, name, avatar }: EditProfileProps) => {
    if (loading) return;
    if (email === '' && phone === '' && name === '') {
      setError('formErrors', {
        message: '이메일 또는 휴대폰 번호를 입력해주세요.',
      });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append('file', avatar[0], user?.id + '');
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      editProfile({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      editProfile({
        email,
        phone,
        name,
      });
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('formErrors', { message: data.error });
    }
  }, [data, setError]);
  const avatar = watch('avatar');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout title="프로필 수정" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-16 px-4 space-y-4">
        <div className="flex flex-col justify-center items-center space-y-3">
          {avatarPreview ? (
            <img src={avatarPreview} className="w-20 h-20 rounded-full" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-400" />
          )}
          <label
            htmlFor="picture"
            className="text-sm font-medium text-gray-700 cursor-pointer px-3 py-2 border border-gray-200 rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            프로필 변경
            <input
              {...register('avatar')}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <Input
            register={register('name')}
            label="Name"
            name="name"
            kind="text"
            type="text"
          />
        </div>
        <div className="space-y-1">
          <Input
            register={register('email')}
            label="Email address"
            name="email"
            kind="email"
            type="email"
          />
        </div>
        <div className="space-y-1">
          <Input
            register={register('phone')}
            label="Phone number"
            name="phone"
            kind="phone"
            type="text"
          />
        </div>
        {errors.formErrors && errors.formErrors !== undefined ? (
          <span className="my-2 text-red-500 font-bold text-center block">
            {errors.root?.message}
          </span>
        ) : null}
        <Button text="수정 완료" loading={loading} />
      </form>
    </Layout>
  );
}
