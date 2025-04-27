
import { Plane, Hotel, Car, Package, Map, GraduationCap, Users, Compass } from "lucide-react";
import CategoryCard from "@/components/ui/CategoryCard";

const ServiceCategories = () => {
  const categories = [
    {
      title: "Flights",
      description: "Find and book affordable flights to destinations worldwide with our easy search tools.",
      icon: Plane,
      href: "/flights",
      color: "bg-teal"
    },
    {
      title: "Hotels",
      description: "Discover the perfect accommodation, from luxury resorts to cozy boutique stays.",
      icon: Hotel,
      href: "/hotels",
      color: "bg-forest-green"
    },
    {
      title: "Car Rentals",
      description: "Explore your destination with freedom by booking the ideal vehicle for your journey.",
      icon: Car,
      href: "/car-rentals",
      color: "bg-sand-gold"
    },
    {
      title: "Vacation Packages",
      description: "Save time and money with our curated vacation packages for all types of travelers.",
      icon: Package,
      href: "/packages",
      color: "bg-copper"
    },
    {
      title: "Experiences",
      description: "Book unique activities, tours, and unforgettable experiences at your destination.",
      icon: Compass,
      href: "/experiences",
      color: "bg-muted-blue"
    },
    {
      title: "Cruise Tours",
      description: "Embark on an unforgettable journey across the seas with premium cruise options.",
      icon: Map,
      href: "/cruises",
      color: "bg-forest-green"
    },
    {
      title: "Group Tours",
      description: "Join like-minded travelers for guided group adventures to amazing destinations.",
      icon: Users,
      href: "/group-tours",
      color: "bg-sand-gold"
    },
    {
      title: "Travel Guides",
      description: "Access expert travel guides and tips to make the most of your journey.",
      icon: GraduationCap,
      href: "/guides",
      color: "bg-teal"
    }
  ];

  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-green mb-4">
            Discover Our Services
          </h2>
          <p className="text-muted-foreground">
            Everything you need for your perfect journey, from transportation to accommodations and experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              href={category.href}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
