
import { useState } from "react";
import { Search, MapPin, Award, Star, ExternalLink, Grid, List, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const agencies = [
  {
    id: 101,
    name: "Wanderlust Voyages",
    logo: "https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    verified: true,
    rating: 4.8,
    reviewCount: 524,
    yearsInBusiness: 12,
    specialties: ["Luxury Travel", "Adventure", "Honeymoon"],
    location: "New York, USA",
    description: "Award-winning travel agency specializing in luxury experiences and adventure tours. Our expert consultants craft unforgettable journeys tailored to your preferences."
  },
  {
    id: 102,
    name: "Global Explorers",
    logo: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    verified: true,
    rating: 4.9,
    reviewCount: 621,
    yearsInBusiness: 15,
    specialties: ["Family Travel", "Cultural Tours", "Safari"],
    location: "London, UK",
    description: "With 15 years of experience, Global Explorers creates immersive travel experiences focusing on cultural immersion and family-friendly adventures."
  },
  {
    id: 103,
    name: "Adventure Seekers",
    logo: "https://images.unsplash.com/photo-1557264337-e8a93017fe92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    verified: false,
    rating: 4.6,
    reviewCount: 312,
    yearsInBusiness: 5,
    specialties: ["Trekking", "Camping", "Outdoor Activities"],
    location: "Denver, USA",
    description: "Specializing in outdoor adventures and trekking expeditions. Our team of experienced adventurers will help you push your boundaries in the world's most beautiful landscapes."
  },
  {
    id: 104,
    name: "Seaside Escapes",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    verified: true,
    rating: 4.7,
    reviewCount: 428,
    yearsInBusiness: 8,
    specialties: ["Beach Holidays", "Island Hopping", "Water Sports"],
    location: "Sydney, Australia",
    description: "Experts in coastal getaways and island adventures. From relaxing beach resorts to exciting water sports, we create perfect seaside holidays."
  },
  {
    id: 105,
    name: "Asian Ventures",
    logo: "https://images.unsplash.com/photo-1525328999621-8a7e54f704a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    verified: true,
    rating: 4.9,
    reviewCount: 372,
    yearsInBusiness: 10,
    specialties: ["Asia Specialists", "Cultural Experiences", "Culinary Tours"],
    location: "Singapore",
    description: "Asia travel specialists providing authentic cultural and culinary experiences across the continent. Our local knowledge ensures unique and immersive journeys."
  },
  {
    id: 106,
    name: "European Discoveries",
    logo: "https://images.unsplash.com/photo-1541535455374-ea5b9d3c0de8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
    verified: false,
    rating: 4.5,
    reviewCount: 287,
    yearsInBusiness: 7,
    specialties: ["European Tours", "Historical Sites", "River Cruises"],
    location: "Paris, France",
    description: "Specialists in European travel with expert knowledge of historical sites, cultural experiences, and the best river cruises across the continent."
  },
  {
    id: 107,
    name: "Luxury Getaways",
    logo: "https://images.unsplash.com/photo-1551909496-5acdc4dfcdbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    verified: true,
    rating: 4.9,
    reviewCount: 489,
    yearsInBusiness: 14,
    specialties: ["Luxury Travel", "VIP Services", "Private Jets"],
    location: "Dubai, UAE",
    description: "Providing exclusive luxury travel experiences with VIP services, private jet arrangements, and access to the world's most prestigious accommodations."
  },
  {
    id: 108,
    name: "Safari Experts",
    logo: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    verified: true,
    rating: 4.8,
    reviewCount: 356,
    yearsInBusiness: 9,
    specialties: ["African Safaris", "Wildlife Tours", "Photography"],
    location: "Nairobi, Kenya",
    description: "Specialized in African safari experiences with expert guides, wildlife photography tours, and sustainable eco-friendly trips to see the continent's magnificent wildlife."
  }
];

// All specialties
const allSpecialties = Array.from(
  new Set(agencies.flatMap(agency => agency.specialties))
).sort();

// All locations
const allLocations = Array.from(
  new Set(agencies.map(agency => agency.location.split(',')[1].trim()))
).sort();

const AgencyCard = ({ agency, viewMode }: { agency: typeof agencies[0], viewMode: "grid" | "list" }) => {
  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-md transition-shadow",
      viewMode === "list" ? "flex flex-col md:flex-row" : ""
    )}>
      <div className={cn(
        "relative",
        viewMode === "list" ? "md:w-1/3" : "h-48"
      )}>
        <img
          src={agency.logo}
          alt={agency.name}
          className="h-full w-full object-cover"
        />
        {agency.verified && (
          <div className="absolute top-2 right-2 bg-forest-green/90 backdrop-blur-sm text-off-white text-xs px-2 py-1 rounded-full flex items-center">
            <Award className="h-3 w-3 mr-1" />
            <span>Verified</span>
          </div>
        )}
      </div>
      
      <div className={cn(
        viewMode === "list" ? "md:w-2/3" : ""
      )}>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-serif text-lg font-bold text-forest-green mb-1">{agency.name}</h3>
              <div className="flex items-center text-muted-blue text-sm mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                {agency.location}
              </div>
            </div>
            <div className="flex items-center bg-cream px-2 py-1 rounded">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium">{agency.rating}</span>
              <span className="text-xs text-muted-blue ml-1">({agency.reviewCount})</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          <div className="flex flex-wrap gap-1 mb-3">
            {agency.specialties.map((specialty, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-cream/50 text-forest-green hover:bg-cream border-cream"
              >
                {specialty}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {agency.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-blue">{agency.yearsInBusiness} years in business</span>
            <Link to={`/agency/${agency.id}`}>
              <Button 
                variant="outline" 
                className="border-forest-green text-forest-green hover:bg-forest-green hover:text-off-white flex items-center gap-2 transition-colors"
              >
                <span>View Agency</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const Agencies = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  // Toggle selection functions
  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty) 
        : [...prev, specialty]
    );
  };
  
  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]
    );
  };
  
  // Filter agencies based on selected filters
  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = searchQuery === '' || 
      agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialties.length === 0 || 
      selectedSpecialties.some(s => agency.specialties.includes(s));
    
    const matchesLocation = selectedLocations.length === 0 || 
      selectedLocations.some(l => agency.location.includes(l));
    
    const matchesRating = selectedRating === 0 || agency.rating >= selectedRating;
    
    const matchesVerified = !showVerifiedOnly || agency.verified;
    
    return matchesSearch && matchesSpecialty && matchesLocation && matchesRating && matchesVerified;
  });

  return (
    <div className="pt-16 min-h-screen bg-off-white">
      {/* Hero section */}
      <div className="bg-forest-green py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-off-white mb-4">
              Travel Agencies
            </h1>
            <p className="text-off-white/80 mb-6">
              Connect with experienced travel agencies to plan your perfect trip
            </p>
            
            <div className="relative max-w-lg mx-auto">
              <Input
                type="text"
                placeholder="Search for travel agencies..."
                className="pl-10 py-6 bg-white/90 backdrop-blur-sm text-forest-green"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold text-forest-green">Filters</h2>
                <Filter className="h-5 w-5 text-forest-green" />
              </div>
              
              {/* Specialties */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <h3 className="font-medium text-forest-green mb-4">Specialties</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {allSpecialties.map(specialty => (
                    <label key={specialty} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedSpecialties.includes(specialty)}
                        onChange={() => toggleSpecialty(specialty)}
                        className="rounded border-gray-300 text-forest-green mr-2" 
                      />
                      <span className="text-sm">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Locations */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <h3 className="font-medium text-forest-green mb-4">Location</h3>
                <div className="space-y-2">
                  {allLocations.map(location => (
                    <label key={location} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedLocations.includes(location)}
                        onChange={() => toggleLocation(location)}
                        className="rounded border-gray-300 text-forest-green mr-2" 
                      />
                      <span className="text-sm">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Rating */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <h3 className="font-medium text-forest-green mb-4">Minimum Rating</h3>
                <div className="flex flex-wrap gap-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating === selectedRating ? 0 : rating)}
                      className={cn(
                        "flex items-center px-3 py-1 rounded-full transition-colors",
                        selectedRating === rating
                          ? "bg-forest-green text-off-white"
                          : "bg-cream text-forest-green hover:bg-cream/70"
                      )}
                    >
                      <Star className="h-3 w-3 mr-1" />
                      <span>{rating}+</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Verified filter */}
              <div>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showVerifiedOnly}
                    onChange={() => setShowVerifiedOnly(!showVerifiedOnly)}
                    className="rounded border-gray-300 text-forest-green mr-2" 
                  />
                  <span className="flex items-center">
                    <Award className="h-4 w-4 mr-1 text-forest-green" />
                    <span>Verified Agencies Only</span>
                  </span>
                </label>
              </div>
              
              <div className="flex flex-col space-y-3 mt-6">
                <Button 
                  className="bg-forest-green hover:bg-teal text-off-white w-full" 
                  onClick={() => {
                    setSelectedSpecialties([]);
                    setSelectedLocations([]);
                    setSelectedRating(0);
                    setShowVerifiedOnly(false);
                    setSearchQuery('');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-forest-green">
                  {filteredAgencies.length} Travel {filteredAgencies.length === 1 ? 'Agency' : 'Agencies'}
                </h2>
              </div>
              
              {/* View toggle */}
              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <span>Sort By</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-48 p-0">
                    <div className="py-1">
                      {["Rating: High to Low", "Years in Business", "Most Reviews", "Alphabetical"].map((option) => (
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
                
                <div className="bg-white rounded-md shadow-sm p-1">
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
                </div>
              </div>
            </div>
            
            {/* Agency cards */}
            <div className={cn(
              "grid gap-6",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            )}>
              {filteredAgencies.map(agency => (
                <AgencyCard 
                  key={agency.id} 
                  agency={agency} 
                  viewMode={viewMode} 
                />
              ))}
            </div>
            
            {filteredAgencies.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <Award className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No agencies found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button 
                  onClick={() => {
                    setSelectedSpecialties([]);
                    setSelectedLocations([]);
                    setSelectedRating(0);
                    setShowVerifiedOnly(false);
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Why work with agencies section */}
      <div className="bg-cream/30 py-12">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-forest-green mb-8 text-center">
            Why Work With a Travel Agency?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg mb-2">Expert Knowledge</h3>
                  <p className="text-gray-600 text-sm">
                    Travel agents have extensive knowledge and experience to help you make informed decisions.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg mb-2">Time & Money Savings</h3>
                  <p className="text-gray-600 text-sm">
                    Agencies have access to exclusive deals and can save you time planning complex itineraries.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg mb-2">Peace of Mind</h3>
                  <p className="text-gray-600 text-sm">
                    Travel agents provide support before, during, and after your trip for a stress-free experience.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg mb-2">Personalized Service</h3>
                  <p className="text-gray-600 text-sm">
                    Receive customized travel recommendations based on your preferences and needs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/contact">
              <Button className="bg-forest-green hover:bg-teal text-off-white">
                Contact Us to Find an Agency
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agencies;
