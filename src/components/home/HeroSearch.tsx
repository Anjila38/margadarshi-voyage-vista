
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const popularDestinations = ["Bali", "Paris", "Kyoto", "Santorini", "New York"];

const HeroSearch = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [travelers, setTravelers] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search page with query params
    navigate(`/search?destination=${destination}&checkIn=${checkIn?.toISOString()}&checkOut=${checkOut?.toISOString()}&travelers=${travelers}`);
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-off-black/30 via-off-black/40 to-off-black/70"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 mt-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-4 reveal-animation">
            Discover Your Perfect Journey
          </h1>
          <p className="text-lg md:text-xl text-off-white/90 reveal-animation reveal-delay-1">
            Explore extraordinary destinations and create unforgettable memories with MargaDarshi as your trusted guide
          </p>
        </div>

        {/* Search form */}
        <div className="max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-6 reveal-animation reveal-delay-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Destination input */}
              <div className="relative">
                <label className="block text-forest-green text-sm font-medium mb-2">
                  Destination
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where to?"
                    className="input-primary w-full pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-blue h-4 w-4" />
                </div>
                {destination && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-md rounded-md z-10 overflow-hidden">
                    {popularDestinations
                      .filter(item => 
                        item.toLowerCase().includes(destination.toLowerCase())
                      )
                      .map((item, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-cream transition-colors"
                          onClick={() => setDestination(item)}
                        >
                          {item}
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>

              {/* Check-in date */}
              <div>
                <label className="block text-forest-green text-sm font-medium mb-2">
                  Check-in
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "input-primary w-full justify-start text-left font-normal",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4 text-muted-blue" />
                      {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out date */}
              <div>
                <label className="block text-forest-green text-sm font-medium mb-2">
                  Check-out
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "input-primary w-full justify-start text-left font-normal",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4 text-muted-blue" />
                      {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-forest-green text-sm font-medium mb-2">
                  Travelers
                </label>
                <div className="relative">
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="input-primary w-full appearance-none pl-10"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Traveler" : "Travelers"}
                      </option>
                    ))}
                  </select>
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-blue h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Search button */}
            <div className="mt-6">
              <Button 
                type="submit"
                className="w-full bg-forest-green hover:bg-teal text-off-white py-3 font-medium rounded-md transition-colors"
              >
                Search Adventures
              </Button>
            </div>
          </form>
          
          {/* Popular searches */}
          <div className="mt-6 text-center">
            <p className="text-off-white/80 mb-2 text-sm">Popular Destinations:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularDestinations.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDestination(item);
                  }}
                  className="bg-off-white/30 hover:bg-off-white/40 text-off-white backdrop-blur-sm px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-off-white to-transparent"></div>
    </section>
  );
};

export default HeroSearch;
