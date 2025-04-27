
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DestinationCard from "@/components/ui/DestinationCard";
import { cn } from "@/lib/utils";

interface DestinationData {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number;
  description: string;
  tag?: string;
  featured?: boolean;
}

const destinations: DestinationData[] = [
  {
    id: 1,
    name: "Serene Beach Retreat",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    rating: 4.9,
    price: 2400,
    description: "Experience tranquility in our exclusive beachfront villas, surrounded by crystal clear waters and pristine white sand beaches.",
    tag: "Trending",
    featured: true
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
    tag: "Best Seller",
    featured: true
  },
];

const FeaturedDestinations = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "all", label: "All Destinations" },
    { id: "trending", label: "Trending Now" },
    { id: "europe", label: "Europe" },
    { id: "asia", label: "Asia" },
    { id: "beaches", label: "Beaches" },
    { id: "mountains", label: "Mountains" }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // In a real app, this would filter based on the active tab
  const filteredDestinations = destinations;

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-green mb-4">
            Discover Extraordinary Destinations
          </h2>
          <p className="text-muted-foreground">
            Explore handpicked destinations that offer unique experiences, breathtaking views, and unforgettable memories
          </p>
        </div>

        {/* Tabs */}
        <div className="relative mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost"
              size="icon"
              onClick={scrollLeft}
              className="hidden md:flex text-forest-green hover:text-teal hover:bg-white/50"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div 
              ref={scrollContainerRef}
              className="flex space-x-2 overflow-x-auto scrollbar-hide px-2 py-2 mx-auto"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-5 py-2 rounded-full whitespace-nowrap transition-colors",
                    activeTab === tab.id
                      ? "bg-forest-green text-off-white"
                      : "bg-white/70 text-forest-green hover:bg-white"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <Button 
              variant="ghost"
              size="icon"
              onClick={scrollRight}
              className="hidden md:flex text-forest-green hover:text-teal hover:bg-white/50"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className={destination.featured ? "lg:col-span-2" : ""}
            >
              <DestinationCard {...destination} />
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <Button
            className="bg-transparent border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-off-white transition-colors duration-300"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
