import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type BookingInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useBookings() {
  return useQuery({
    queryKey: [api.bookings.list.path],
    queryFn: async () => {
      const res = await fetch(api.bookings.list.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return api.bookings.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: BookingInput) => {
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        if (res.status === 401) throw new Error("Please sign in to book a property");
        throw new Error(error.message || "Failed to create booking");
      }

      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.bookings.list.path] });
      toast({
        title: "Booking Confirmed!",
        description: "Your reservation has been successfully created.",
        variant: "default", // You might want a 'success' variant or just default
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
