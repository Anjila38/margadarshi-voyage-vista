import { useState } from 'react';
import { Search, Filter, Calendar, ChevronDown, Star, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from 'date-fns';
import DestinationCard from '@/components/ui/DestinationCard';

// Sample packages data
const packages = [
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
    description: "Immerse yourself in Japanese culture as you explore ancient temples, traditional tea houses, and beautiful cherry blossom gardens."
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
  {
    id: 7,
    name: "Northern Lights Experience",
    location: "Iceland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    rating: 4.8,
    price: 2200,
    description: "Witness the magical aurora borealis from your glass-roofed cabin, and explore glaciers, waterfalls, and volcanic landscapes.",
    tag: "Seasonal"
  },
  {
    id: 8,
    name: "Greek Island Paradise",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
    rating: 4.9,
    price: 1950,
    description: "Relax in stunning whitewashed villas with infinity pools overlooking the azure Aegean Sea and famous Santorini sunsets."
  }
];

// Duration options
const durations = [
  "2-3 days",
  "4-7 days",
  "8-14 days",
  "15+ days"
];

// Package types
const packageTypes = [
  "Adventure",
  "Beach",
  "Cultural",
  "Family",
  "Luxury",
  "Romantic",
  "Wildlife"
];

const Packages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [selectedStars, setSelectedStars] = useState(0);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [includeFlights, setIncludeFlights] = useState(false);
  
  const toggleDuration = (duration: string) => {
    setSelectedDuration(prev => 
      prev.includes(duration) 
        ? prev.filter(d => d !== duration) 
        : [...prev, duration]
    );
  };
  
  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  // Filter the packages based on search and selected filters
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = searchQuery === '' || 
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    
    const matchesRating = selectedStars === 0 || pkg.rating >= selectedStars;
    
    // For demo purposes, we'll assume all durations and types match if none are selected
    const matchesDuration = selectedDuration.length === 0 || selectedDuration.includes(getPackageDuration(pkg.id));
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(getPackageType(pkg.id));
    
    return matchesSearch && matchesPrice && matchesRating && matchesDuration && matchesType;
  });
  
  // Helper function to determine package duration (for demo purposes)
  function getPackageDuration(id: number): string {
    const durationMap: Record<number, string> = {
      1: "4-7 days",
      2: "4-7 days",
      3: "8-14 days",
      4: "4-7 days",
      5: "8-14 days",
      6: "8-14 days",
      7: "4-7 days", 
      8: "8-14 days"
    };
    
    return durationMap[id] || "4-7 days";
  }
  
  // Helper function to determine package type (for demo purposes)
  function getPackageType(id: number): string {
    const typeMap: Record<number, string> = {
      1: "Beach",
      2: "Adventure",
      3: "Cultural",
      4: "Luxury",
      5: "Romantic",
      6: "Wildlife",
      7: "Adventure",
      8: "Beach"
    };
    
    return typeMap[id] || "Adventure";
  }

  return (
    <div className="pt-16 min-h-screen bg-off-white">
      {/* Hero section */}
      <div className="relative bg-forest-green">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-off-white mb-4 text-center">
              Find Your Dream Travel Package
            </h1>
            <p className="text-center text-off-white/90 mb-8">
              Discover curated packages that include accommodation, experiences, and more
            </p>
            
            {/* Search box */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="space-y-6">
                  <Input
                    type="text"
                    placeholder="Search destinations, experiences, or packages..."
                    className="bg-cream/30 border-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-forest-green mb-1">Travel Dates</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dateRange.from && !dateRange.to && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {dateRange.from ? (
                              dateRange.to ? (
                                <>
                                  {format(dateRange.from, "MMM d, y")} - {format(dateRange.to, "MMM d, y")}
                                </>
                              ) : (
                                format(dateRange.from, "MMM d, y")
                              )
                            ) : (
                              <span>Select your travel dates</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="range"
                            selected={{
                              from: dateRange.from,
                              to: dateRange.to,
                            }}
                            onSelect={setDateRange as any}
                            numberOfMonths={2}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-forest-green mb-1">Travelers</label>
                      <select
                        className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-forest-green"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Switch 
                      id="include-flights"
                      checked={includeFlights}
                      onCheckedChange={setIncludeFlights}
                      className="data-[state=checked]:bg-forest-green"
                    />
                    <label 
                      htmlFor="include-flights" 
                      className="ml-2 text-sm font-medium cursor-pointer text-forest-green"
                    >
                      Include flights in package
                    </label>
                  </div>
                  
                  <Button 
                    className="w-full bg-forest-green hover:bg-teal text-off-white"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search Packages
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Package listings section */}
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold text-forest-green">Filters</h2>
                <Filter className="h-5 w-5 text-forest-green" />
              </div>
              
              {/* Price range filter */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <h3 className="font-medium text-forest-green mb-4">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-blue">${priceRange[0]}</span>
                  <span className="text-sm text-muted-blue">${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Duration filter */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <h3 className="font-medium text-forest-green mb-4">Duration</h3>
                <div className="space-y-2">
                  {durations.map(duration => (
                    <div key={duration} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`duration-${duration}`} 
                        checked={selectedDuration.includes(duration)}
                        onChange={() => toggleDuration(duration)}
                        className="rounded border-gray-300 text-forest-green focus:ring-forest-green" 
                      />
                      <label htmlFor={`duration-${duration}`} className="ml-2 text-sm cursor-pointer">
                        {duration}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Package type filter */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <h3 className="font-medium text-forest-green mb-4">Package Type</h3>
                <div className="flex flex-wrap gap-2">
                  {packageTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm transition-colors",
                        selectedTypes.includes(type)
                          ? "bg-forest-green text-off-white"
                          : "bg-cream text-forest-green hover:bg-sand-gold/30"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Rating filter */}
              <div className="mb-6">
                <h3 className="font-medium text-forest-green mb-4">Rating</h3>
                <div className="flex flex-wrap gap-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedStars(rating === selectedStars ? 0 : rating)}
                      className={cn(
                        "flex items-center px-3 py-1 rounded-full transition-colors",
                        selectedStars === rating
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
              
              <div className="flex flex-col space-y-3 mt-6">
                <Button className="bg-forest-green hover:bg-teal text-off-white w-full">
                  Apply Filters
                </Button>
                <Button variant="outline" className="w-full">
                  Clear All
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-forest-green">
                  Travel Packages
                </h2>
                <p className="text-muted-blue">
                  {filteredPackages.length} packages found
                </p>
              </div>
              
              {/* Sort dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>Sort By</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48 p-0">
                  <div className="py-1">
                    {["Popularity", "Price: Low to High", "Price: High to Low", "Rating", "Duration"].map((option) => (
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
            </div>
            
            {/* Package cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPackages.map(pkg => (
                <DestinationCard
                  key={pkg.id}
                  {...pkg}
                />
              ))}
            </div>
            
            {filteredPackages.length === 0 && (
              <div className="text-center py-12">
                <Tag className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No packages found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search query to find more packages
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedDuration([]);
                  setSelectedTypes([]);
                  setPriceRange([500, 5000]);
                  setSelectedStars(0);
                  setDateRange({ from: undefined, to: undefined });
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
            
            {filteredPackages.length > 0 && (
              <div className="flex justify-center mt-10">
                <Button className="bg-forest-green hover:bg-teal text-off-white">
                  Load More Packages
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Package types section */}
      <div className="bg-cream/30 py-12">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-forest-green mb-8 text-center">
            Explore Package Types
          </h2>
          
          <Tabs defaultValue="all">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Types</TabsTrigger>
                <TabsTrigger value="adventure">Adventure</TabsTrigger>
                <TabsTrigger value="beach">Beach</TabsTrigger>
                <TabsTrigger value="cultural">Cultural</TabsTrigger>
                <TabsTrigger value="luxury">Luxury</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative rounded-xl overflow-hidden h-48 group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                    alt="Adventure package"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end p-4">
                    <h3 className="text-off-white font-serif font-bold text-xl">Adventure</h3>
                  </div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden h-48 group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                    alt="Beach package"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end p-4">
                    <h3 className="text-off-white font-serif font-bold text-xl">Beach</h3>
                  </div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden h-48 group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Cultural package"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end p-4">
                    <h3 className="text-off-white font-serif font-bold text-xl">Cultural</h3>
                  </div>
                </div>
                
                <div className="relative rounded-xl overflow-hidden h-48 group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Luxury package"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end p-4">
                    <h3 className="text-off-white font-serif font-bold text-xl">Luxury</h3>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Other tab contents would be similar but filtered */}
            <TabsContent value="adventure" className="space-y-8">
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-forest-green mb-4">Adventure Packages</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Embark on thrilling adventures from mountain trekking to desert safaris.
                  Our adventure packages are designed for those seeking excitement and new experiences.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="beach" className="space-y-8">
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-forest-green mb-4">Beach Packages</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Relax on pristine beaches and enjoy crystal clear waters.
                  Our beach packages offer the perfect balance of relaxation and water activities.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="cultural" className="space-y-8">
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-forest-green mb-4">Cultural Packages</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Immerse yourself in local traditions, cuisine, and history.
                  Our cultural packages provide authentic experiences and deep connections with destinations.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="luxury" className="space-y-8">
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-forest-green mb-4">Luxury Packages</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Experience the finest accommodations, dining, and exclusive activities.
                  Our luxury packages are crafted for those seeking premium travel experiences.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Packages;
