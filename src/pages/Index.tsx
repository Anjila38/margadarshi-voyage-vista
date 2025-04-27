
import HeroSearch from "@/components/home/HeroSearch";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import ServiceCategories from "@/components/home/ServiceCategories";
import TopAgencies from "@/components/home/TopAgencies";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <div className="flex flex-col">
      <HeroSearch />
      <FeaturedDestinations />
      <ServiceCategories />
      <TopAgencies />
      <Testimonials />
      <HowItWorks />
      <Newsletter />
    </div>
  );
};

export default Index;
