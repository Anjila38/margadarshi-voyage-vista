
import React from "react";
import { MapPin, Star, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const AgencyCard = ({
  id,
  name,
  location,
  image,
  logo,
  rating,
  reviewCount,
  specializations,
  verified,
}) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Cover image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={image}
          alt={`${name} cover`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Location overlay */}
        <div className="absolute bottom-3 left-3 flex items-center text-white text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        {/* Verified badge */}
        {verified && (
          <div className="absolute top-3 right-3 bg-forest-green text-white text-xs px-3 py-1 rounded-full flex items-center">
            <Shield className="h-3 w-3 mr-1" />
            <span>Verified</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative px-4 pt-12 pb-4 flex-grow">
        {/* Logo */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="h-16 w-16 rounded-full bg-white p-1 shadow-md">
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
        
        {/* Agency name and rating */}
        <div className="text-center mb-3">
          <h3 className="font-serif font-bold text-lg text-forest-green">{name}</h3>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="flex items-center text-sand-gold">
              <Star className="h-4 w-4 fill-sand-gold" />
              <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400 text-sm">({reviewCount} reviews)</span>
          </div>
        </div>
        
        {/* Specializations */}
        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {specializations.slice(0, 3).map((spec, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-cream text-forest-green rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
        
        {/* Action button */}
        <Link
          to={`/agency/${id}`}
          className="block w-full text-center py-2 px-4 bg-forest-green/10 hover:bg-forest-green hover:text-white transition-colors text-forest-green font-medium rounded-md mt-auto"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default AgencyCard;
