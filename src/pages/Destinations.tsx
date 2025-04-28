
import { useState, useEffect } from "react";
import { Grid, MapIcon, Filter, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DestinationCard from "@/components/ui/DestinationCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Mock data for destinations
const destinationsData = [
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

const regions = [
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Antarctica"
];

const experiences = [
  "Beach",
  "Mountain",
  "City",
  "Countryside",
  "Desert",
  "Rainforest",
  "Island",
  "Historical"
];

const Destinations = () => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region) 
        : [...prev, region]
    );
  };
  
  const toggleExperience = (experience: string) => {
    setSelectedExperiences(prev => 
      prev.includes(experience) 
        ? prev.filter(e => e !== experience) 
        : [...prev, experience]
    );
  };
  
  // Filter the destinations based on search and selected filters
  const filteredDestinations = destinationsData.filter(destination => {
    const matchesSearch = searchQuery === "" || 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If no regions are selected, show all. Otherwise, check if the destination matches any selected region
    // For demo purposes, we're assuming certain regions for each location
    const destinationRegion = getRegionForLocation(destination.location);
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(destinationRegion);
    
    // Similar logic for experiences
    // For demo purposes, we're assuming certain experiences for each destination
    const destinationExperience = getExperienceForDestination(destination);
    const matchesExperience = selectedExperiences.length === 0 || selectedExperiences.includes(destinationExperience);
    
    return matchesSearch && matchesRegion && matchesExperience;
  });
  
  // Helper function to determine region based on location (for demo purposes)
  function getRegionForLocation(location: string): string {
    const regionMap: Record<string, string> = {
      "Maldives": "Asia",
      "Switzerland": "Europe",
      "Japan": "Asia",
      "Morocco": "Africa",
      "Italy": "Europe",
      "Costa Rica": "North America",
      "Iceland": "Europe",
      "Greece": "Europe"
    };
    
    for (const [key, value] of Object.entries(regionMap)) {
      if (location.includes(key)) return value;
    }
    
    return "Asia"; // Default
  }
  
  // Helper function to determine experience type (for demo purposes)
  function getExperienceForDestination(destination: any): string {
    if (destination.name.includes("Beach") || destination.location.includes("Maldives") || destination.location.includes("Greece")) 
      return "Beach";
    if (destination.name.includes("Alpine") || destination.location.includes("Switzerland")) 
      return "Mountain";
    if (destination.name.includes("City") || destination.location.includes("Kyoto")) 
      return "City";
    if (destination.name.includes("Wine") || destination.location.includes("Tuscan")) 
      return "Countryside";
    if (destination.name.includes("Desert") || destination.location.includes("Morocco")) 
      return "Desert";
    if (destination.name.includes("Rainforest") || destination.location.includes("Costa Rica")) 
      return "Rainforest";
    if (destination.location.includes("Iceland")) 
      return "Mountain";
    if (destination.location.includes("Greece")) 
      return "Island";
    
    return "Beach"; // Default
  }

  return (
    <div className="pt-16 min-h-screen bg-off-white">
      {/* Hero section */}
      <div className="relative bg-forest-green text-off-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container-custom py-16 md:py-24 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Explore Amazing Destinations
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Discover the world's most breathtaking locations and plan your dream journey
          </p>
          
          {/* Search bar */}
          <div className="max-w-lg mx-auto relative">
            <Input
              type="text"
              placeholder="Search destinations..."
              className="pl-10 py-6 bg-white/90 backdrop-blur-sm text-forest-green"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-3 left-3 text-gray-500" />
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        {/* Filters section */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-serif font-bold text-forest-green">Filters</h2>
            
            <div className="flex items-center gap-3">
              {/* View toggle */}
              <div className="bg-cream/50 p-1 rounded-md flex">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewMode === "grid" 
                      ? "bg-forest-green text-off-white" 
                      : "text-forest-green hover:bg-cream"
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewMode === "map" 
                      ? "bg-forest-green text-off-white" 
                      : "text-forest-green hover:bg-cream"
                  )}
                  aria-label="Map view"
                >
                  <MapIcon className="h-4 w-4" />
                </button>
              </div>
              
              {/* Mobile filter button */}
              <Popover>
                <PopoverTrigger asChild className="md:hidden">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="space-y-4">
                    {/* Region filters */}
                    <div>
                      <h3 className="font-medium mb-2">Regions</h3>
                      <div className="flex flex-wrap gap-2">
                        {regions.map((region) => (
                          <button
                            key={region}
                            onClick={() => toggleRegion(region)}
                            className={cn(
                              "px-3 py-1 rounded-full text-sm transition-colors",
                              selectedRegions.includes(region)
                                ? "bg-forest-green text-off-white"
                                : "bg-cream text-forest-green hover:bg-cream/70"
                            )}
                          >
                            {region}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Experience filters */}
                    <div>
                      <h3 className="font-medium mb-2">Experiences</h3>
                      <div className="flex flex-wrap gap-2">
                        {experiences.map((exp) => (
                          <button
                            key={exp}
                            onClick={() => toggleExperience(exp)}
                            className={cn(
                              "px-3 py-1 rounded-full text-sm transition-colors",
                              selectedExperiences.includes(exp)
                                ? "bg-forest-green text-off-white"
                                : "bg-cream text-forest-green hover:bg-cream/70"
                            )}
                          >
                            {exp}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Desktop filter options */}
          <div className="hidden md:block">
            <Tabs defaultValue="region">
              <TabsList className="mb-4">
                <TabsTrigger value="region">Region</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </TabsList>
              <TabsContent value="region">
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => toggleRegion(region)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm transition-colors",
                        selectedRegions.includes(region)
                          ? "bg-forest-green text-off-white"
                          : "bg-cream text-forest-green hover:bg-cream/70"
                      )}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="experience">
                <div className="flex flex-wrap gap-2">
                  {experiences.map((exp) => (
                    <button
                      key={exp}
                      onClick={() => toggleExperience(exp)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm transition-colors",
                        selectedExperiences.includes(exp)
                          ? "bg-forest-green text-off-white"
                          : "bg-cream text-forest-green hover:bg-cream/70"
                      )}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Active filters */}
          {(selectedRegions.length > 0 || selectedExperiences.length > 0 || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <div className="bg-forest-green/10 text-forest-green px-3 py-1 rounded-full text-sm flex items-center">
                  <span>"{searchQuery}"</span>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="ml-2 hover:text-teal"
                  >
                    ×
                  </button>
                </div>
              )}
              
              {selectedRegions.map(region => (
                <div 
                  key={region}
                  className="bg-forest-green/10 text-forest-green px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <span>{region}</span>
                  <button 
                    onClick={() => toggleRegion(region)}
                    className="ml-2 hover:text-teal"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {selectedExperiences.map(exp => (
                <div 
                  key={exp}
                  className="bg-forest-green/10 text-forest-green px-3 py-1 rounded-full text-sm flex items-center"
                >
                  <span>{exp}</span>
                  <button 
                    onClick={() => toggleExperience(exp)}
                    className="ml-2 hover:text-teal"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {(selectedRegions.length > 0 || selectedExperiences.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedRegions([]);
                    setSelectedExperiences([]);
                  }}
                  className="text-sm text-muted-blue hover:text-forest-green underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Results section */}
        {viewMode === "grid" ? (
          <>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-forest-green mb-6">
              {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'} Found
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  {...destination}
                />
              ))}
            </div>
            
            {filteredDestinations.length === 0 && (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">No destinations found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedRegions([]);
                    setSelectedExperiences([]);
                  }}
                  variant="link"
                  className="mt-2 text-forest-green"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <h3 className="text-xl font-medium text-forest-green mb-4">Map View Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              We're working on an interactive map to help you explore destinations visually.
              Check back soon for this exciting feature!
            </p>
            <Button
              onClick={() => setViewMode("grid")}
              className="bg-forest-green text-off-white hover:bg-teal"
            >
              Switch to Grid View
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
