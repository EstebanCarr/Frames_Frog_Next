import { fetchTokenNfts } from '@/utils/airstack';

export async function getAirstackData() {
  const tokenNfts = await fetchTokenNfts();
  
  return {
    tokenNfts
  };
}