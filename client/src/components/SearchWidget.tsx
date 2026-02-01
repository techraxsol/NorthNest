import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, User, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchWidget({ horizontal = true }: { horizontal?: boolean }) {
  const [location, setLocation] = useLocation();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("location", destination);
    if (date.from) params.set("checkIn", date.from.toISOString());
    if (date.to) params.set("checkOut", date.to.toISOString());
    params.set("guests", guests.toString());
    
    setLocation(`/search?${params.toString()}`);
  };

  return (
    <div className={cn(
      "bg-[#FEBB02] p-1 rounded-md shadow-xl max-w-5xl mx-auto",
      horizontal ? "" : "max-w-md w-full"
    )}>
      <div className={cn(
        "bg-white p-2 rounded-sm grid gap-2",
        horizontal ? "grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto]" : "grid-cols-1"
      )}>
        {/* Destination */}
        <div className="relative flex items-center border rounded-md hover:border-black transition-colors">
          <MapPin className="ml-3 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Where are you going?" 
            className="border-0 focus-visible:ring-0 shadow-none text-base h-12"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "h-12 justify-start text-left font-normal border-gray-200 hover:border-black transition-colors",
                !date.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {date.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                  </>
                ) : (
                  format(date.from, "LLL dd")
                )
              ) : (
                <span>Check-in — Check-out</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date.from}
              selected={date}
              onSelect={(range: any) => setDate(range)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Guests */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 justify-start font-normal border-gray-200 hover:border-black transition-colors">
              <User className="mr-2 h-4 w-4 text-gray-400" />
              <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Adults</span>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-4 text-center">{guests}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setGuests(guests + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button 
          onClick={handleSearch}
          className="h-12 bg-[#003580] hover:bg-[#00224f] text-white text-lg font-semibold px-8"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
