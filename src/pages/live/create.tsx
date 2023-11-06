import Button from '../../../components/button';
import Input from '../../../components/input';
import Layout from '../../../components/layout';
import TextArea from '../../../components/textArea';

export default function Create() {
  return (
    <Layout title="라이브 방송 등록" canGoBack>
      <div className="py-16 px-4 space-y-5">
        <Input label="상품명" name="name" kind="text" required />

        <Input
          label="가격"
          name="price"
          kind="price"
          required
          placeholder="0"
        />
        <TextArea name="description" label="설명" />

        <Button text="Go Live" />
      </div>
    </Layout>
  );
}
