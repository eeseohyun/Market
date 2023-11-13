import Layout from '../../components/layout';
import FloatButton from '../../components/floatButton';
import Item from '../../components/item';
import useUser from '../../libs/client/useUser';
import useSWR from 'swr';
import { Items } from '@prisma/client';

export interface ItemWithCount extends Items {
  _count: {
    favorite: number;
  };
}
interface ItemsResponse {
  ok: boolean;
  items: Items[];
}

export default function Home() {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ItemsResponse>('/api/items');
  console.log(data);
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-2 py-14 divide-y-[1px]">
        {data?.items.map((item) => (
          <Item
            id={item.id}
            key={item.id}
            title={item.name}
            price={item.price}
            comments={1}
            hearts={item._count?.favorite || 0}
          />
        ))}
        <FloatButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatButton>
      </div>
    </Layout>
  );
}
