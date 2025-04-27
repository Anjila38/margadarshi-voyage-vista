
import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-20 bg-cream/90">
      <div className="container-custom">
        <div className="relative mx-auto max-w-5xl bg-forest-green text-off-white rounded-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-sand-gold/10 rounded-full blur-xl"></div>
          </div>
          
          <div className="relative grid md:grid-cols-5 gap-6 p-8 md:p-12">
            {/* Content: 3/5 width on md+ screens */}
            <div className="md:col-span-3 space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Get Inspired for Your Next Journey
              </h2>
              <p className="text-off-white/80">
                Subscribe to our newsletter and receive personalized travel recommendations, 
                exclusive offers, and expert advice directly to your inbox.
              </p>
              
              <div className="pt-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sand-gold/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-sand-gold" />
                    </div>
                    <span className="text-sm text-off-white/80">Travel Guides</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sand-gold/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-sand-gold" />
                    </div>
                    <span className="text-sm text-off-white/80">Exclusive Offers</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sand-gold/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-sand-gold" />
                    </div>
                    <span className="text-sm text-off-white/80">Destination Tips</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form: 2/5 width on md+ screens */}
            <div className="md:col-span-2 flex items-center">
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 border border-white/20 focus:border-sand-gold focus:outline-none focus:ring-1 focus:ring-sand-gold placeholder:text-white/50 text-off-white"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting || email.length === 0}
                  className={cn(
                    "w-full bg-sand-gold hover:bg-copper text-off-black transition-all duration-300",
                    isSuccess && "bg-teal hover:bg-teal"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-off-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center">
                      <Check className="mr-2 h-4 w-4" />
                      Subscribed!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2 h-4 w-4" />
                      Subscribe Now
                    </span>
                  )}
                </Button>
                
                <p className="text-xs text-off-white/60 text-center">
                  We respect your privacy and will never share your information.
                  You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
