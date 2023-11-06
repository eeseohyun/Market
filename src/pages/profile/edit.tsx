import Button from '../../../components/button';
import Input from '../../../components/input';
import Layout from '../../../components/layout';

export default function EditProfile() {
  return (
    <Layout title="프로필 수정" canGoBack>
      <form className="py-16 px-4 space-y-4">
        <div className="flex flex-col justify-center items-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-slate-400" />
          <label
            htmlFor="picture"
            className="text-sm font-medium text-gray-700 cursor-pointer px-3 py-2 border border-gray-200 rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            프로필 변경
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <Input label="Email address" name="email" kind="email" required />
        </div>
        <div className="space-y-1">
          <Input label="Phone number" name="phone" kind="phone" required />
        </div>

        <Button text="수정 완료" />
      </form>
    </Layout>
  );
}
