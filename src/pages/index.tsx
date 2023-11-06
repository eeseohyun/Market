import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '../../components/layout';
import FloatButton from '../../components/floatButton';
import Item from '../../components/item';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-2 py-14 divide-y-[1px]">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            id={i}
            key={i}
            title="Iphone 15"
            price={999}
            comments={1}
            hearts={1}
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
