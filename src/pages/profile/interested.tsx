import ItemList from '../../../components/itemList';
import Layout from '../../../components/layout';

export default function Interested() {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-2 py-14 divide-y-[1px]">
        <ItemList kind="favorites" />
      </div>
    </Layout>
  );
}
