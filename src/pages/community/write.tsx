import Button from '../../../components/button';
import Layout from '../../../components/layout';
import TextArea from '../../../components/textArea';

export default function Write() {
  return (
    <Layout title="질문 작성" canGoBack>
      <form className="px-4 py-16 space-y-4">
        <TextArea required placeholder="질문을 남겨주세요." />
        <Button text="완료" />
      </form>
    </Layout>
  );
}
