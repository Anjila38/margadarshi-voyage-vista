
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  id: number;
  text: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  featured?: boolean;
  className?: string;
}

const TestimonialCard = ({
  id,
  text,
  author,
  location,
  avatar,
  rating,
  featured = false,
  className,
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl p-6 shadow-md",
        "border border-cream hover:border-muted-blue/30 transition-all duration-300",
        "relative flex flex-col h-full",
        featured ? "md:col-span-2" : "",
        featured ? "bg-gradient-to-br from-forest-green/[0.03] to-teal/[0.07]" : "",
        className
      )}
    >
      {/* Quotation mark */}
      <div className="absolute top-4 right-5 text-6xl leading-none text-sand-gold/20 font-serif">
        "
      </div>

      {/* Rating */}
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4 mr-1",
              star <= rating
                ? "text-sand-gold fill-sand-gold"
                : "text-gray-300"
            )}
          />
        ))}
      </div>

      {/* Testimonial text */}
      <p className="text-gray-700 mb-6 flex-grow">{text}</p>

      {/* Author info */}
      <div className="flex items-center mt-auto">
        <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 mr-4 border-2 border-cream">
          <img
            src={avatar}
            alt={`${author} avatar`}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-forest-green">{author}</p>
          <p className="text-sm text-muted-blue">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
