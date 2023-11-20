import Item from './item';
import useSWR from 'swr';
import { ItemWithCount } from '@/pages';

interface ItemListProps {
  kind: 'favorites' | 'sales' | 'purchases';
}

interface Record {
  id: number;
  item: ItemWithCount;
}
interface SoldProps {
  [key: string]: Record[];
}

export default function ItemList({ kind }: ItemListProps) {
  const { data } = useSWR<SoldProps>(`/api/users/user/records?kind=Sale`);
  return data
    ? data[kind]?.map((record) => (
        <Item
          key={record.id}
          id={record.item.id}
          title={record.item.name}
          price={record.item.price}
          comments={1}
          hearts={record.item._count.favorite}
        />
      ))
    : null;
}
