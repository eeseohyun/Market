interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
  loading?: boolean;
}

export default function Button({
  large = false,
  onClick,
  text,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={loading}
      className={`w-full bg-orange-400 hover:bg-orange-500 text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none
        ${large ? 'py-3 text-base' : 'py-2 text-sm'} ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {text}
    </button>
  );
}
