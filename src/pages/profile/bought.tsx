import ItemList from '../../../components/itemList';
import Layout from '../../../components/layout';

export default function Bought() {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-2 py-14 divide-y-[1px]">
        <ItemList kind="purchases" />
      </div>
    </Layout>
  );
}
