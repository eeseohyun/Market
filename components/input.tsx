interface InputProps {
  label: string;
  name: string;
  kind?: 'text' | 'phone' | 'price' | 'email';
  [key: string]: any; //이외 type, placeholder, required 등등
}

export default function Input({
  label,
  name,
  kind = 'text',
  ...rest
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === 'text' ? (
        <div className="rounded-md relative flex items-center shadow-sm">
          <input
            id={name}
            {...rest}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      ) : null}
      {kind === 'price' ? (
        <div className="rounded-md relative shadow-sm flex items-center">
          <input
            id={name}
            {...rest}
            type="number"
            className="apperance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute right-0 pr-6 flex items-center pointer-events-none">
            <span className="text-gray-500">원</span>
          </div>
        </div>
      ) : null}
      {kind === 'phone' ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            id={name}
            {...rest}
            type="number"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      ) : null}
      {kind === 'email' ? (
        <input
          id={name}
          {...rest}
          type="email"
          className="apperance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      ) : null}
    </div>
  );
}
