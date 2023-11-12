import { useRouter } from 'next/router';
import Button from '../../../components/button';
import Layout from '../../../components/layout';
import useSWR from 'swr';
import Link from 'next/link';
import { Items, User } from '@prisma/client';

interface ItemWithUser extends Items {
  user: User;
}
interface ItemDetailProps {
  ok: boolean;
  item: ItemWithUser;
  relatedItems: Items[];
}

export default function ItemDetail() {
  const router = useRouter();
  const { data } = useSWR<ItemDetailProps>(
    router.query.id ? `/api/items/${router.query.id}` : null
  );

  return (
    <Layout title="상품 상세" canGoBack>
      <div className="px-4 py-16">
        <div>
          <div className="h-96 bg-slate-300" />
          <div className="flex py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.item?.user?.name}
              </p>
              <Link
                href={`/users/profiles/${data?.item?.user.id}`}
                className="text-xs font-medium text-gray-400 cursor-pointer"
              >
                View Profile &rarr;
              </Link>
            </div>
          </div>
          <div className="mt-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.item?.name}
            </h1>
            <span className="text-3xl block mt-2 text-gray-900">
              {data?.item?.price}
            </span>
            <p className="text-base my-6 text-gray-700">
              {data?.item?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button text="채팅하기" large />
              <button className="p-3 flex items-center justify-center text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                <svg
                  className="h-6 w-6 "
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {data?.relatedItems.map((item) => (
              <div key={item.id} className="">
                <div className="w-full h-56 bg-slate-300 mb-3" />
                <Link href={`/items/${item.id}`}></Link>
                <h3 className="text-gray-700 -mb-0.5">{item.name}</h3>
                <span className="text-sm font-medium text-gray-900">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
