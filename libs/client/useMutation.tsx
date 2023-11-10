import { useState } from 'react';

interface UserMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UserMutationResult<T> = [(data: any) => void, UserMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UserMutationResult<T> {
  const [state, setState] = useState<UserMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
