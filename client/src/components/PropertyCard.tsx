import { Link } from "wouter";
import { type Listing } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Check } from "lucide-react";

export function PropertyCard({ listing }: { listing: Listing }) {
  // Format price - assuming price is in cents
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(listing.price / 100);

  const rating = Number(listing.rating);
  const ratingLabel = rating >= 4.5 ? "Exceptional" : rating >= 4.0 ? "Very Good" : rating >= 3.5 ? "Good" : "Pleasant";

  return (
    <Card className="overflow-hidden border border-border/60 hover:border-[#003580]/50 hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image */}
          <div className="w-full md:w-[300px] h-[240px] md:h-auto relative overflow-hidden shrink-0">
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-[#FEBB02] text-[#003580] hover:bg-[#FEBB02] font-bold border-0">
                Early 2024 Deal
              </Badge>
            </div>
            {/* Using stock image placeholder from Unsplash logic */}
            {/* travel hotel room interior cozy modern */}
            <img 
              src={listing.imageUrl || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop"} 
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4 md:p-5 gap-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1 text-sm text-[#003580] font-medium mb-1">
                  <span className="capitalize">{listing.type}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.round(rating) ? 'fill-[#FEBB02] text-[#FEBB02]' : 'fill-gray-200 text-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
                <Link href={`/property/${listing.id}`}>
                  <h3 className="text-xl font-bold text-[#003580] hover:underline cursor-pointer mb-1 line-clamp-1">
                    {listing.title}
                  </h3>
                </Link>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="underline decoration-dotted">{listing.location}</span>
                  <span className="text-xs ml-1">• 1.2 km from center</span>
                </div>
              </div>

              {/* Rating Box */}
              <div className="flex items-end flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-[#003580]">{ratingLabel}</div>
                    <div className="text-xs text-muted-foreground">142 reviews</div>
                  </div>
                  <div className="bg-[#003580] text-white font-bold p-1.5 rounded-t-md rounded-br-md text-sm min-w-[32px] text-center">
                    {rating}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex-1">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/80 border-l-2 border-gray-200 pl-2">
                {listing.features?.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {listing.description}
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end mt-4 gap-4">
              <div className="text-sm text-destructive font-medium">
                Only 2 rooms left at this price on our site
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <div className="text-xs text-muted-foreground">1 night, 2 adults</div>
                <div className="text-2xl font-bold text-[#003580] font-display">
                  {formattedPrice}
                </div>
                <div className="text-xs text-muted-foreground mb-1">+ $24 taxes and charges</div>
                <Link href={`/property/${listing.id}`} className="w-full">
                  <Button className="w-full md:w-auto bg-[#003580] hover:bg-[#00224f] text-white">
                    See availability
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
