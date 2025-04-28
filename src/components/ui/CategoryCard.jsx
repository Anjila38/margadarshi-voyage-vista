
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const CategoryCard = ({
  title,
  description,
  icon: Icon,
  href,
  color = "bg-muted-blue",
  className,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "flex flex-col items-start justify-between h-full",
        "border border-muted-blue/20 bg-white",
        className
      )}
    >
      {/* Icon with background */}
      <div
        className={cn(
          "mb-4 rounded-full p-3 text-white",
          color
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-serif text-xl font-bold text-forest-green mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      </div>

      {/* Action indicator */}
      <div className="flex items-center mt-auto text-forest-green font-medium group-hover:text-teal transition-colors">
        <span>Explore</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
  );
};

export default CategoryCard;
