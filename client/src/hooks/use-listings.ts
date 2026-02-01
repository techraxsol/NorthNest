import { useQuery } from "@tanstack/react-query";
import { api, buildUrl, type ListingResponse } from "@shared/routes";

interface SearchParams {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  type?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
}

export function useListings(params?: SearchParams) {
  // Convert date objects to strings or remove if undefined
  const queryParams: Record<string, string> = {};
  if (params?.location) queryParams.location = params.location;
  if (params?.minPrice) queryParams.minPrice = params.minPrice;
  if (params?.maxPrice) queryParams.maxPrice = params.maxPrice;
  if (params?.type) queryParams.type = params.type;
  if (params?.guests) queryParams.guests = params.guests.toString();
  
  // Note: Backend might use dates for availability checking, passing them along
  if (params?.checkIn) queryParams.checkIn = params.checkIn.toISOString();
  if (params?.checkOut) queryParams.checkOut = params.checkOut.toISOString();

  const queryString = new URLSearchParams(queryParams).toString();
  const queryKey = [api.listings.list.path, queryString];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = `${api.listings.list.path}?${queryString}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch listings");
      return api.listings.list.responses[200].parse(await res.json());
    },
  });
}

export function useListing(id: number) {
  return useQuery({
    queryKey: [api.listings.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.listings.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch listing");
      return api.listings.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
