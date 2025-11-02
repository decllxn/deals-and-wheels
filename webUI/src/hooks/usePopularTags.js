// src/hooks/usePopularTags.js
import { useQuery } from '@tanstack/react-query';
import { getPopularTags } from '../api/Listings'

export const usePopularTags = () => {
  return useQuery({
    queryKey: ['popular-tags'],
    queryFn: getPopularTags,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 1,
  });
};