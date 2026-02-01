import { useRoute, useLocation } from "wouter";
import { useListing } from "@/hooks/use-listings";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays, differenceInDays } from "date-fns";
import { MapPin, Star, Wifi, Car, Utensils, Award, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PropertyDetails() {
  const [, params] = useRoute("/property/:id");
  const [, setLocation] = useLocation();
  const id = Number(params?.id);
  const { data: listing, isLoading } = useListing(id);
  const { user } = useAuth();
  const { toast } = useToast();
  const createBooking = useCreateBooking();

  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#003580]" />
        </div>
      </div>
    );
  }

  if (!listing) return <div>Not found</div>;

  const nights = date.from && date.to ? differenceInDays(date.to, date.from) : 0;
  const totalPrice = nights * listing.price;
  
  const handleBook = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to make a booking.",
        variant: "destructive"
      });
      setTimeout(() => window.location.href = '/api/login', 1000);
      return;
    }

    if (!date.from || !date.to) {
      toast({
        title: "Select dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive"
      });
      return;
    }

    createBooking.mutate({
      listingId: listing.id,
      userId: user.id || "guest", // Should come from auth context
      startDate: date.from.toISOString(),
      endDate: date.to.toISOString(),
      totalPrice: totalPrice,
      status: "confirmed"
    }, {
      onSuccess: () => {
        setLocation("/bookings");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      <Header />
      
      <main className="container-custom py-6 flex-1">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-300">{listing.type}</Badge>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Number(listing.rating) ? 'fill-[#FEBB02] text-[#FEBB02]' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
            </div>
            <h1 className="text-3xl font-bold font-display text-gray-900">{listing.title}</h1>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{listing.location}</span>
              <span className="mx-2">•</span>
              <span className="text-[#003580] font-medium">Excellent location - show map</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="text-[#003580] hover:bg-blue-50">Share</Button>
            <Button className="bg-[#003580] text-white hover:bg-[#00224f]">Reserve</Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] mb-8 rounded-xl overflow-hidden">
          <div className="md:col-span-2 h-full relative group cursor-pointer">
            <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop" className="w-full h-full object-cover" />
            <img src="https://pixabay.com/get/g92cb3f839d1c4cd66ab9c1f2e5f1a7b8bfa6dfec663d76da64577f9f42beaf69613e1f3fc2d714dbf7ae4c4a967a53daa47a2804c3c48f273e5da157685bc255_1280.jpg" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src="https://pixabay.com/get/g6316b7e64c85dd087ad53db2e1b7953d8670368aa88bcf58e3e861e9111718d460a3a0dba879a9c9b684a2eecddf41dc1f13513772163c343291c66454e5119f_1280.jpg" className="w-full h-full object-cover" />
            <div className="relative h-full">
              <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500&auto=format&fit=crop" className="w-full h-full object-cover" />
              <Button variant="secondary" className="absolute bottom-4 right-4 text-xs h-8">Show all photos</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              {listing.description}
            </p>

            <div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">Most popular facilities</h3>
              <div className="flex flex-wrap gap-4">
                {listing.features?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-2 rounded-md">
                    {i % 3 === 0 ? <Wifi className="w-4 h-4" /> : i % 3 === 1 ? <Car className="w-4 h-4" /> : <Utensils className="w-4 h-4" />}
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-[#F8FAFC] border-none shadow-none p-6">
              <h3 className="font-bold text-lg mb-2">Property Highlights</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Award className="w-5 h-5 text-[#FEBB02]" />
                  <div>
                    <span className="font-bold text-sm block">Top Rated</span>
                    <span className="text-sm text-gray-600">Highly rated by recent guests (9.2/10)</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-[#003580]" />
                  <div>
                    <span className="font-bold text-sm block">Great Location</span>
                    <span className="text-sm text-gray-600">94% of recent guests gave the location a 5-star rating</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sticky Booking Widget */}
          <div className="relative">
            <Card className="sticky top-24 border-[#FEBB02] bg-[#EBF3FF] shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                ${listing.price / 100} <span className="text-sm font-normal text-gray-500">/ night</span>
              </h3>
              <p className="text-green-600 text-sm mb-4">Free cancellation</p>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-white">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>{format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}</>
                          ) : (
                            format(date.from, "LLL dd")
                          )
                        ) : (
                          <span>Pick dates</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(range: any) => setDate(range)}
                        numberOfMonths={1}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="bg-white p-3 rounded-md border text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>${listing.price / 100} x {nights} nights</span>
                    <span>${totalPrice / 100}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Service fee</span>
                    <span>$0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice / 100}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 text-lg font-bold bg-[#003580] hover:bg-[#00224f]"
                  onClick={handleBook}
                  disabled={createBooking.isPending}
                >
                  {createBooking.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Reserve Now"
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  You won't be charged yet
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
