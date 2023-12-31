import Layout from '../../../components/layout';
import Link from 'next/link';

export default function Chats() {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="py-16 divide-y-[1px]">
        {[1, 1, 1, 1, 1].map((_, i) => (
          <Link
            href={`/chats/${i}`}
            key={i}
            className="flex py-3 px-4 cursor-pointer items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jobs</p>
              <p className="text-sm text-gray-500">
                내일 퇴근 후, 연락드리겠습니다!
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
