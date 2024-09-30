import { useQuery } from '@tanstack/react-query';

export const useJsonQuery = url => {
  return useQuery({
    queryKey: [url],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0]);
      if (!res.ok) throw res;
      return await res.json();
    }
  });
};