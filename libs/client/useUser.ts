import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<ProfileResponse>('/api/users/user');
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
    if (data && data.ok && router.pathname === '/enter') {
      router.replace('/profile');
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
