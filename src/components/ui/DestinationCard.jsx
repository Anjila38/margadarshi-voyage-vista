
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const DestinationCard = ({
  id,
  name,
  location,
  image,
  rating,
  price,
  description,
  tag,
  className,
}) => {
  return (
    <div className={cn("group overflow-hidden rounded-xl shadow-md transition-all duration-300 bg-white hover:shadow-lg", className)}>
      <Link to={`/package/${id}`} className="block">
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Price tag */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="font-medium text-forest-green">${price}</span>
            <span className="text-muted-blue text-sm">/person</span>
          </div>
          
          {/* Featured tag */}
          {tag && (
            <div className="absolute top-4 left-4 bg-sand-gold/90 backdrop-blur-sm text-off-white text-sm px-3 py-1 rounded-full">
              {tag}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title and location */}
          <div>
            <h3 className="font-serif font-bold text-lg text-forest-green mb-1 group-hover:text-teal transition-colors">{name}</h3>
            <p className="text-muted-blue text-sm flex items-center">
              <span className="w-1 h-1 bg-muted-blue rounded-full inline-block mr-2"></span>
              {location}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4 mr-1",
                  i < Math.floor(rating)
                    ? "text-sand-gold fill-sand-gold"
                    : i < rating
                    ? "text-sand-gold fill-sand-gold opacity-50"
                    : "text-gray-300"
                )}
              />
            ))}
            <span className="text-muted-blue text-sm ml-1">{rating.toFixed(1)}</span>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          
          {/* Action button */}
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full border-forest-green text-forest-green hover:bg-forest-green hover:text-white transition-colors"
            >
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;
