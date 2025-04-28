
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AgencyCard from "@/components/ui/AgencyCard";
import { cn } from "@/lib/utils";

const agencies = [
  {
    id: 1,
    name: "Wanderlust Voyages",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1577417006421-4eb1b536fefa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80",
    logo: "https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    rating: 4.8,
    reviewCount: 524,
    specializations: ["Luxury Travel", "Adventure Tours", "Honeymoons"],
    verified: true,
  },
  {
    id: 2,
    name: "Exotic Escapes",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1506782081254-09bcfdcc5123?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    logo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    rating: 4.7,
    reviewCount: 412,
    specializations: ["Safari Tours", "Cultural Experiences", "Island Getaways"],
    verified: true,
  },
  {
    id: 3,
    name: "Horizon Expeditions",
    location: "Sydney, Australia",
    image: "https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    logo: "https://images.unsplash.com/photo-1572462133029-e8e5185c87e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    rating: 4.9,
    reviewCount: 387,
    specializations: ["Wilderness Tours", "Active Adventures", "Wildlife Safaris"],
    verified: true,
  },
  {
    id: 4,
    name: "Azure Journeys",
    location: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    logo: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    rating: 4.6,
    reviewCount: 298,
    specializations: ["Mediterranean Cruises", "Food & Wine", "City Breaks"],
    verified: true,
  },
];

const TopAgencies = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Agencies" },
    { id: "luxury", name: "Luxury" },
    { id: "adventure", name: "Adventure" },
    { id: "cultural", name: "Cultural" },
    { id: "eco", name: "Eco-friendly" },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-green mb-4">
            Top-Rated Travel Agencies
          </h2>
          <p className="text-muted-foreground">
            Discover trusted agencies with years of expertise in creating extraordinary travel experiences
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors text-sm",
                activeCategory === category.id
                  ? "bg-forest-green text-off-white"
                  : "bg-cream text-forest-green hover:bg-sand-gold/20"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Agencies grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agencies.map((agency) => (
            <AgencyCard
              key={agency.id}
              {...agency}
            />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button
            className="bg-transparent border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-off-white transition-colors duration-300"
          >
            View All Agencies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopAgencies;
