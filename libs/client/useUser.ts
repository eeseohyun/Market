import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function useUser() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR('/api/users/user');
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}

//super_cache = {
//   '/api/users/user' : {
//     ok:true,
//      profile:{id: 1, phone: 12345, email:null, name:'유저', ...}
//   }
// }
