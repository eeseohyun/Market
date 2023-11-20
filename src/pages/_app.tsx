import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRProvider } from '@/app/SWRProvider';
import useUser from '../../libs/client/useUser';

function CustomUser() {
  const { user } = useUser();
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRProvider>
      <div className="w-full max-w-xl mx-auto">
        <CustomUser />
        <Component {...pageProps} />
      </div>
    </SWRProvider>
  );
}
