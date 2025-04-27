
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
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

const DestinationCard = ({
  id,
  name,
  location,
  image,
  rating,
  price,
  description,
  tag,
  featured = false,
}: DestinationCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500",
        featured ? "md:col-span-2" : "",
        "hover:shadow-xl card-hover"
      )}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-off-black/70"></div>
        
        {/* Tag */}
        {tag && (
          <span className="absolute top-4 left-4 bg-forest-green text-off-white px-3 py-1 text-xs font-medium rounded-full">
            {tag}
          </span>
        )}
        
        {/* Favorite button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        >
          <Heart
            size={18}
            className={cn(
              "transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-forest-green"
            )}
          />
        </button>
        
        {/* Location info */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-serif font-bold text-lg md:text-xl">{name}</h3>
          <div className="flex items-center text-sm space-x-1">
            <span>{location}</span>
          </div>
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4">
        {/* Rating and price row */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-sand-gold mr-1 fill-sand-gold" />
            <span className="font-medium text-sm">{rating.toFixed(1)}</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-muted-blue">From</span>
            <p className="font-bold text-forest-green">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Action button */}
        <div className="flex">
          <Link
            to={`/package/${id}`}
            className="w-full text-center py-2 px-4 bg-cream hover:bg-sand-gold transition-colors text-forest-green font-medium text-sm rounded-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
