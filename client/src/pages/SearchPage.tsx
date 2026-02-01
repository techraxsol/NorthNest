import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchWidget } from "@/components/SearchWidget";
import { PropertyCard } from "@/components/PropertyCard";
import { useListings } from "@/hooks/use-listings";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    type: searchParams.get("type") || "",
    guests: Number(searchParams.get("guests")) || 2
  });

  const { data: listings, isLoading } = useListings(filters);

  // Update filters if URL changes
  useEffect(() => {
    setFilters({
      location: searchParams.get("location") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      type: searchParams.get("type") || "",
      guests: Number(searchParams.get("guests")) || 2
    });
  }, [window.location.search]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Header />
      
      <div className="bg-[#003580] py-8">
        <div className="container-custom">
          <SearchWidget horizontal={true} />
        </div>
      </div>

      <main className="container-custom py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b">Filter by:</h3>
              
              {/* Budget */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Your budget (per night)</h4>
                <Slider defaultValue={[200]} max={1000} step={10} className="mb-4" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Property type</h4>
                <div className="space-y-2">
                  {['Hotel', 'Apartment', 'Resort', 'Villa'].map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={type} />
                      <Label htmlFor={type} className="text-sm font-normal">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Facilities</h4>
                <div className="space-y-2">
                  {['WiFi', 'Parking', 'Pool', 'Restaurant', 'Pet friendly'].map(f => (
                    <div key={f} className="flex items-center space-x-2">
                      <Checkbox id={f} />
                      <Label htmlFor={f} className="text-sm font-normal">{f}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Promo Map Box (Visual only) */}
            <div className="relative h-32 rounded-md overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100 cursor-pointer">
              <Button variant="outline" className="bg-white/90 font-bold text-[#003580] shadow-sm">
                Show on map
              </Button>
            </div>
          </aside>

          {/* Results List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold font-display text-gray-900">
                {filters.location ? `${filters.location}: ` : ""} {listings?.length ?? 0} properties found
              </h1>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-full">Sort by: Recommended</Button>
              </div>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                // Loading Skeletons
                [1, 2, 3].map(i => (
                  <div key={i} className="bg-white border rounded-md p-4 flex gap-4 h-60">
                    <Skeleton className="w-[300px] h-full rounded-md" />
                    <div className="flex-1 py-2 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="mt-auto pt-8">
                        <Skeleton className="h-10 w-32 ml-auto" />
                      </div>
                    </div>
                  </div>
                ))
              ) : listings?.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-md border">
                  <h3 className="text-lg font-semibold text-gray-900">No properties found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search for a different location.</p>
                </div>
              ) : (
                listings?.map((listing) => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
