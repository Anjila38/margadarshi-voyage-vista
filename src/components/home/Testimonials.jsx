
import { useState } from "react";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    text: "Our trip to Bali was absolutely perfect. MargaDarshi connected us with a local agency that created a personalized itinerary matching exactly what we wanted. The accommodations were stunning and the guided experiences were authentic and memorable.",
    author: "Emma Thompson",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    rating: 5,
    featured: true
  },
  {
    id: 2,
    text: "I was skeptical about booking through a platform, but MargaDarshi exceeded all expectations. Their customer service was top-notch, helping me navigate issues with flight changes and ensuring our safari trip went smoothly.",
    author: "Michael Rodriguez",
    location: "Toronto, Canada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    rating: 5
  },
  {
    id: 3,
    text: "The Swiss Alps adventure package we booked through MargaDarshi was the highlight of our year. Everything from the mountain chalet to the guided hikes and local experiences was carefully selected and exceptional quality.",
    author: "Sophia Chen",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1522&q=80",
    rating: 4
  },
  {
    id: 4,
    text: "As a solo female traveler, safety was my primary concern. The MargaDarshi team recommended agencies that specialized in solo travel, and checked in with me throughout my journey across Southeast Asia. I felt supported every step of the way.",
    author: "Olivia Johnson",
    location: "Melbourne, Australia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    rating: 5
  },
];

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", name: "All Reviews" },
    { id: "adventures", name: "Adventures" },
    { id: "luxury", name: "Luxury" },
    { id: "family", name: "Family" },
    { id: "solo", name: "Solo Travel" },
  ];

  // In a real app, this would filter based on the active tab
  const filteredTestimonials = testimonials;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-off-white to-cream/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-green mb-4">
            Our Travelers' Stories
          </h2>
          <p className="text-muted-foreground">
            Authentic experiences shared by travelers who discovered extraordinary journeys through MargaDarshi
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors text-sm",
                activeTab === tab.id
                  ? "bg-forest-green text-off-white"
                  : "bg-white text-forest-green hover:bg-cream"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
            />
          ))}
        </div>
        
        {/* Pattern decorations */}
        <div className="relative">
          <div className="absolute -bottom-16 -left-12 w-24 h-24 rounded-full bg-sand-gold/10 blur-xl"></div>
          <div className="absolute -top-20 -right-16 w-32 h-32 rounded-full bg-teal/10 blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
