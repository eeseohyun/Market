export default function Write() {
  return (
    <form className="px-4 py-10">
      <textarea
        className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
        rows={4}
        placeholder="궁금한 질문을 남겨주세요."
      />
      <button className="bg-orange-400 mt-5 w-full hover:bg-orange-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-400">
        완료
      </button>
    </form>
  );
}
