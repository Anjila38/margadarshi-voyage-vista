
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: 1,
    title: "Discover",
    description: "Browse destinations, agencies, and travel packages tailored to your preferences.",
    color: "bg-sand-gold",
    image: "https://images.unsplash.com/photo-1581351721010-8cf859cb14f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Person browsing travel options on tablet"
  },
  {
    id: 2,
    title: "Plan",
    description: "Customize your ideal journey with our intuitive planning tools and expert guidance.",
    color: "bg-muted-blue",
    image: "https://images.unsplash.com/photo-1605811753628-1e945a1c0dad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    alt: "People planning trip with map and documents"
  },
  {
    id: 3,
    title: "Book",
    description: "Secure your travel arrangements with our trusted partners through our secure booking system.",
    color: "bg-forest-green",
    image: "https://images.unsplash.com/photo-1565538420870-da08ff96a207?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", 
    alt: "Person confirming booking on laptop"
  },
  {
    id: 4,
    title: "Experience",
    description: "Embark on your journey with 24/7 support and our mobile app as your travel companion.",
    color: "bg-teal",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Travelers enjoying vacation experience"
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-forest-green to-teal text-off-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            How MargaDarshi Works
          </h2>
          <p className="text-off-white/80">
            Your journey from dream to destination in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Steps navigation */}
          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={cn(
                  "p-5 rounded-lg cursor-pointer transition-all duration-300 border-l-4",
                  activeStep === step.id
                    ? "bg-white/10 border-sand-gold transform translate-x-1"
                    : "bg-white/5 border-transparent hover:bg-white/10"
                )}
              >
                <div className="flex items-start">
                  <div
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-medium mr-4",
                      step.color
                    )}
                  >
                    {activeStep >= step.id ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-white">{step.id}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-1">
                      {step.title}
                    </h3>
                    <p className="text-off-white/70 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4">
              <Button className="bg-sand-gold text-off-black hover:bg-copper hover:text-off-white transition-colors">
                Start Your Journey
              </Button>
            </div>
          </div>

          {/* Right: Image display */}
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-xl">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  activeStep === step.id ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-off-black/50 to-transparent"></div>
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-off-white/90">
                    {step.description}
                  </p>
                </div>
                
                {/* Step indicator */}
                <div
                  className={cn(
                    "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center",
                    step.color
                  )}
                >
                  <span className="font-bold text-off-white">{step.id}</span>
                </div>
              </div>
            ))}
            
            {/* Progress indicators */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    activeStep === step.id 
                      ? `bg-sand-gold w-8`
                      : "bg-white/50 hover:bg-white/70"
                  )}
                  aria-label={`Go to step ${step.id}: ${step.title}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
