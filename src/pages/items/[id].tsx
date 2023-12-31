import { useRouter } from 'next/router';
import Button from '../../../components/button';
import Layout from '../../../components/layout';
import useSWR from 'swr';
import Link from 'next/link';
import { Items, User } from '@prisma/client';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';

interface ItemWithUser extends Items {
  user: User;
}
interface ItemDetailProps {
  ok: boolean;
  item: ItemWithUser;
  relatedItems: Items[];
  isLiked: boolean;
}

export default function ItemDetail() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<ItemDetailProps>(
    router.query.id ? `/api/items/${router.query.id}` : null
  );
  const [toggleFavorite] = useMutation(
    `/api/items/${router.query.id}/favorite`
  );
  const onClick = () => {
    toggleFavorite({});
    //Optimistic UI Update => API를 기다릴 필요 없이 아주 빠른 반응형 UI 가능
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false); //첫번재 인자는 업데이트할 캐쉬 데이터, 두번째 인자는 캐시 업데이트 이후 백엔드 요청을 통해 검증(default:true)
    //즉, only 캐시 데이터만 변경
  };

  return (
    <Layout title="상품 상세" canGoBack>
      <div className="px-4 py-16">
        <div>
          <img
            src={`https://imagedelivery.net/SBlo4UQjj-e8L8lXozu18g/${data?.item.image}/public`}
            className="h-96"
          />
          <div className="flex py-3 border-t border-b items-center space-x-3">
            <img
              src={`https://imagedelivery.net/SBlo4UQjj-e8L8lXozu18g/${data?.item.user.avatar}/avatar`}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.item?.user?.name}
              </p>
              <Link
                href={`/users/profiles/${data?.item?.user?.id}`}
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
              <button
                onClick={onClick}
                className={`p-3 flex items-center justify-center hover:bg-gray-100 rounded-md focus:outline-none
                  ${
                    data?.isLiked
                      ? 'text-red-400  hover:text-red-500'
                      : 'text-gray-400  hover:text-gray-500'
                  }`}
              >
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill={data?.isLiked ? 'currentColor' : 'none'}
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
