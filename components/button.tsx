interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
  loading?: boolean;
}

const Button = ({
  large = false,
  onClick,
  text,
  loading = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={loading}
      className={`bg-orange-400 hover:bg-orange-600 w-full text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none
        ${large ? 'py-3 text-base' : 'py-2 text-sm'} ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
