export default function EditProfile() {
  return (
    <div className="py-10 px-4 space-y-4">
      <div className="flex flex-col justify-center items-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-slate-400" />
        <label
          htmlFor="picture"
          className="text-sm font-medium text-gray-700 cursor-pointer px-3 py-2 border border-gray-200 rounded-md shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          프로필 변경
          <input id="picture" type="file" className="hidden" accept="image/*" />
        </label>
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          className="apperance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          required
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone number
        </label>
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center text-sm px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none">
            +82
          </span>
          <input
            id="input"
            type="number"
            className="apperance-none w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
      </div>

      <button className="w-full bg-orange-400 mt-5 hover:bg-orange-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-400">
        수정 완료
      </button>
    </div>
  );
}
