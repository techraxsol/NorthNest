import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useBookings } from "@/hooks/use-bookings";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Calendar, MapPin, CheckCircle } from "lucide-react";

export default function BookingsPage() {
  const { data: bookings, isLoading, error } = useBookings();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />
      
      <main className="container-custom py-12 flex-1">
        <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600 mb-8">Manage your upcoming and past trips</p>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        ) : error ? (
          <div className="p-8 bg-red-50 text-red-700 rounded-lg">
            Failed to load bookings. Please try signing in again.
          </div>
        ) : bookings?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#003580]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">Time to dust off your luggage and start planning your next adventure.</p>
            <Button onClick={() => window.location.href = '/'} className="bg-[#003580]">Start Searching</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings?.map((booking) => (
              <Card key={booking.id} className="overflow-hidden border border-border hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="w-full md:w-64 h-48 bg-gray-200 shrink-0">
                    <img 
                      src={booking.listing?.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop"} 
                      alt="Property" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-[#003580]">{booking.listing?.title}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {booking.listing?.location}
                          </div>
                        </div>
                        <Badge className={booking.status === 'confirmed' ? 'bg-green-600' : 'bg-gray-500'}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <span className="block text-gray-500 text-xs mb-1">CHECK-IN</span>
                          <span className="font-bold text-gray-900">{format(new Date(booking.startDate), "EEE, MMM d, yyyy")}</span>
                          <span className="block text-gray-500 text-xs mt-1">from 3:00 PM</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <span className="block text-gray-500 text-xs mb-1">CHECK-OUT</span>
                          <span className="font-bold text-gray-900">{format(new Date(booking.endDate), "EEE, MMM d, yyyy")}</span>
                          <span className="block text-gray-500 text-xs mt-1">until 11:00 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action/Price */}
                  <div className="p-6 md:border-l border-gray-100 flex flex-col justify-between items-end bg-gray-50/50 md:w-60 shrink-0">
                    <div className="text-right w-full">
                      <span className="block text-xs text-gray-500">Total Price</span>
                      <span className="block text-xl font-bold text-gray-900">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(booking.totalPrice / 100)}
                      </span>
                    </div>
                    
                    <div className="w-full space-y-2 mt-4">
                      <Button className="w-full bg-[#003580] hover:bg-[#00224f]" size="sm">View details</Button>
                      <Button variant="outline" className="w-full bg-white text-gray-700" size="sm">Manage booking</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
