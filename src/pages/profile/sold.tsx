import Item from '../../../components/item';
import Layout from '../../../components/layout';
import useSWR from 'swr';
import { ItemWithCount } from '..';
import ItemList from '../../../components/itemList';

interface Record {
  id: number;
  item: ItemWithCount;
}
interface SoldProps {
  [key: string]: Record[];
}

export default function Sold() {
  const { data } = useSWR<SoldProps>(`/api/users/user/records?kind=Sale`);
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-2 py-14 divide-y-[1px]">
        <ItemList kind="sales" />
      </div>
    </Layout>
  );
}
