export default function Chats() {
  return (
    <div className="py-10 divide-y-[1px]">
      {[1, 1, 1, 1, 1].map((_, i) => (
        <div
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
        </div>
      ))}
    </div>
  );
}
