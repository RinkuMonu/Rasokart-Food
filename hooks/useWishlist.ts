import { useWishlistContext } from '@/context/WishlistContext';

export function useWishlist() {
  return useWishlistContext();
}

export default useWishlist;
