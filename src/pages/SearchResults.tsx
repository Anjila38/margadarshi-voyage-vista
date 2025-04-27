
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid, List, Map as MapIcon, Calendar, X, ChevronDown, Star, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import DestinationCard from "@/components/ui/DestinationCard";

// Temporary mock data
const destinations = [
  {
    id: 1,
    name: "Serene Beach Retreat",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    rating: 4.9,
    price: 2400,
    description: "Experience tranquility in our exclusive beachfront villas, surrounded by crystal clear waters and pristine white sand beaches.",
    tag: "Trending"
  },
  {
    id: 2,
    name: "Alpine Adventure Lodge",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1580654843061-8c90a9ba24dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
    rating: 4.7,
    price: 1800,
    description: "Nestled in the majestic Swiss Alps, this cozy lodge offers breathtaking mountain views and access to premium ski slopes.",
    tag: "Seasonal"
  },
  {
    id: 3,
    name: "Ancient City Explorer",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.8,
    price: 1650,
    description: "Immerse yourself in Japanese culture as you explore ancient temples, traditional tea houses, and beautiful cherry blossom gardens.",
  },
  {
    id: 4,
    name: "Desert Oasis Retreat",
    location: "Marrakech, Morocco",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.6,
    price: 1250,
    description: "Experience luxury in the heart of the desert with traditional riads, vibrant markets, and unforgettable stargazing experiences."
  },
  {
    id: 5,
    name: "Tuscan Wine Country Villa",
    location: "Florence, Italy",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.9,
    price: 2100,
    description: "Indulge in the authentic Italian lifestyle with vineyard tours, cooking classes, and relaxation in a private countryside villa.",
    tag: "Best Seller"
  },
  {
    id: 6,
    name: "Tropical Rainforest Lodge",
    location: "Costa Rica",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.7,
    price: 1750,
    description: "Immerse yourself in nature at this eco-friendly lodge surrounded by lush rainforest, exotic wildlife, and stunning waterfalls.",
    tag: "Eco-friendly"
  },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    rating: 0,
    amenities: [] as string[],
    experiences: [] as string[],
  });

  // Get search params
  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const travelers = searchParams.get("travelers");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAmenity = (amenity: string) => {
    setSelectedFilters((prev) => {
      const amenities = [...prev.amenities];
      if (amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: amenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...amenities, amenity]
        };
      }
    });
  };

  const toggleExperience = (experience: string) => {
    setSelectedFilters((prev) => {
      const experiences = [...prev.experiences];
      if (experiences.includes(experience)) {
        return {
          ...prev,
          experiences: experiences.filter(e => e !== experience)
        };
      } else {
        return {
          ...prev,
          experiences: [...experiences, experience]
        };
      }
    });
  };

  const setRating = (rating: number) => {
    setSelectedFilters((prev) => ({
      ...prev,
      rating
    }));
  };

  return (
    <div className="pt-16 min-h-screen bg-off-white">
      {/* Search header */}
      <div className="bg-forest-green py-8">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-off-white mb-2">
            {destination ? `Travel packages in ${destination}` : "All destinations"}
          </h1>
          <div className="flex flex-wrap gap-2 text-off-white/80">
            {checkIn && checkOut && (
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
                </span>
              </div>
            )}
            {travelers && (
              <div className="text-sm">
                <span>·</span>
                <span className="ml-2">{travelers} Travelers</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              variant="outline"
              className="w-full justify-between"
            >
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isSidebarOpen ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Sidebar / Filters */}
          <div
            className={cn(
              "lg:w-1/4 bg-white rounded-lg shadow-sm p-5 overflow-hidden transition-all duration-300",
              isSidebarOpen ? "max-h-[2000px]" : "max-h-0 p-0 lg:max-h-[2000px] lg:p-5"
            )}
          >
            {/* Price Range */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="font-serif font-bold text-lg mb-4">Price Range</h3>
              <Slider
                defaultValue={priceRange}
                min={100}
                max={10000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex justify-between items-center">
                <div className="bg-cream px-3 py-1 rounded text-sm font-medium text-forest-green">
                  ${priceRange[0]}
                </div>
                <div className="text-sm text-muted-blue">to</div>
                <div className="bg-cream px-3 py-1 rounded text-sm font-medium text-forest-green">
                  ${priceRange[1]}
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div className="py-6 border-b border-gray-200">
              <h3 className="font-serif font-bold text-lg mb-4">Star Rating</h3>
              <div className="flex flex-wrap gap-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setRating(rating === selectedFilters.rating ? 0 : rating)}
                    className={cn(
                      "flex items-center px-3 py-1 rounded-full transition-colors",
                      selectedFilters.rating === rating
                        ? "bg-forest-green text-off-white"
                        : "bg-cream text-forest-green hover:bg-sand-gold/30"
                    )}
                  >
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    <span>{rating}+</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="py-6 border-b border-gray-200">
              <h3 className="font-serif font-bold text-lg mb-4">Amenities</h3>
              <div className="space-y-3">
                {["Wi-Fi", "Swimming Pool", "Spa", "Restaurant", "Fitness Center", "Airport Transfer"].map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <Switch
                      checked={selectedFilters.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                      className="data-[state=checked]:bg-forest-green"
                    />
                    <span className="ml-2 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiences */}
            <div className="py-6">
              <h3 className="font-serif font-bold text-lg mb-4">Experiences</h3>
              <div className="flex flex-wrap gap-2">
                {["Adventure", "Cultural", "Beach", "Romantic", "Wildlife", "Wellness"].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => toggleExperience(exp)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-colors",
                      selectedFilters.experiences.includes(exp)
                        ? "bg-forest-green text-off-white"
                        : "bg-cream text-forest-green hover:bg-sand-gold/30"
                    )}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply filters button */}
            <Button className="w-full bg-forest-green hover:bg-teal text-off-white transition-colors mt-4">
              Apply Filters
            </Button>
          </div>

          {/* Results container */}
          <div className="lg:w-3/4">
            {/* Results header */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl font-medium">
                  {destinations.length} results found
                </h2>
              </div>

              <div className="flex items-center gap-3">
                {/* Sorting dropdown */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      <span>Sort</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-48 p-0">
                    <div className="py-1">
                      {["Price: Low to High", "Price: High to Low", "Rating: High to Low", "Duration: Short to Long"].map((option) => (
                        <button
                          key={option}
                          className="w-full text-left px-4 py-2 hover:bg-cream text-sm transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* View mode toggle */}
                <div className="flex items-center bg-white rounded-md shadow-sm p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded transition-colors",
                      viewMode === "grid"
                        ? "bg-cream text-forest-green"
                        : "text-gray-500 hover:text-forest-green"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded transition-colors",
                      viewMode === "list"
                        ? "bg-cream text-forest-green"
                        : "text-gray-500 hover:text-forest-green"
                    )}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("map")}
                    className={cn(
                      "p-2 rounded transition-colors",
                      viewMode === "map"
                        ? "bg-cream text-forest-green"
                        : "text-gray-500 hover:text-forest-green"
                    )}
                    aria-label="Map view"
                  >
                    <MapIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedFilters.rating > 0 && (
                <div className="flex items-center bg-forest-green/10 text-forest-green px-3 py-1 rounded-full text-sm">
                  <span className="flex items-center">
                    <Star className="h-3 w-3 mr-1" /> {selectedFilters.rating}+ stars
                  </span>
                  <button
                    onClick={() => setRating(0)}
                    className="ml-2 text-forest-green hover:text-teal"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {selectedFilters.amenities.map(amenity => (
                <div 
                  key={amenity}
                  className="flex items-center bg-forest-green/10 text-forest-green px-3 py-1 rounded-full text-sm"
                >
                  <span>{amenity}</span>
                  <button
                    onClick={() => toggleAmenity(amenity)}
                    className="ml-2 text-forest-green hover:text-teal"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {selectedFilters.experiences.map(experience => (
                <div 
                  key={experience}
                  className="flex items-center bg-forest-green/10 text-forest-green px-3 py-1 rounded-full text-sm"
                >
                  <span>{experience}</span>
                  <button
                    onClick={() => toggleExperience(experience)}
                    className="ml-2 text-forest-green hover:text-teal"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {(selectedFilters.rating > 0 || selectedFilters.amenities.length > 0 || selectedFilters.experiences.length > 0) && (
                <button
                  onClick={() => setSelectedFilters({
                    rating: 0,
                    amenities: [],
                    experiences: [],
                  })}
                  className="text-sm text-muted-blue hover:text-forest-green underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Results grid */}
            <div className={cn(
              "grid gap-6",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            )}>
              {destinations.map((destination) => (
                <div key={destination.id} className={viewMode === "list" ? "w-full" : ""}>
                  <DestinationCard {...destination} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 border-forest-green text-forest-green"
                  disabled
                >
                  &lt;
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    className={cn(
                      "w-10 h-10 p-0",
                      page === 1
                        ? "bg-forest-green text-off-white"
                        : "border-forest-green text-forest-green"
                    )}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 border-forest-green text-forest-green"
                >
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
