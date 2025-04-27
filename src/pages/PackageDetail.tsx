
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Star, 
  Check, 
  X, 
  Share2,
  Heart,
  ChevronDown,
  ChevronRight,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const packageData = {
  id: 1,
  name: "Serene Beach Retreat",
  location: "Maldives",
  duration: "7 Days / 6 Nights",
  rating: 4.9,
  reviewCount: 87,
  price: 2400,
  discount: 15,
  description: "Experience tranquility in our exclusive beachfront villas, surrounded by crystal clear waters and pristine white sand beaches. This all-inclusive package offers the perfect balance of relaxation and adventure in one of the world's most beautiful island destinations.",
  longDescription: "Escape to paradise with our premium Maldives retreat package. Nestled on a private island in the heart of the Indian Ocean, our luxury resort offers an unparalleled experience of serenity and natural beauty. Wake up each morning to breathtaking ocean views from your private overwater villa. Spend your days exploring vibrant coral reefs, swimming with exotic marine life, or simply relaxing on powder-soft beaches.<br/><br/>This thoughtfully curated package includes premium accommodations, gourmet dining experiences featuring local and international cuisine, and a selection of water sports and activities. Indulge in spa treatments inspired by ancient healing traditions, or join guided excursions to discover hidden lagoons and uninhabited islands.<br/><br/>Whether you're seeking a romantic getaway or a rejuvenating escape, our Serene Beach Retreat promises unforgettable memories in one of the world's most stunning destinations.",
  images: [
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1586005126094-066e7a681b3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival & Welcome",
      description: "Arrive at Malé International Airport where you'll be greeted by our representative. Enjoy a scenic seaplane transfer to the resort. Settle into your villa and attend a welcome dinner on the beach."
    },
    {
      day: 2,
      title: "Island Exploration",
      description: "After breakfast, join a guided tour of the island. Learn about local flora and fauna, and enjoy a traditional Maldivian lunch. Afternoon at leisure with optional snorkeling session."
    },
    {
      day: 3,
      title: "Underwater Adventure",
      description: "Experience a guided scuba diving excursion to the nearby coral reefs (suitable for all experience levels). Afternoon spa treatment followed by sunset dolphin watching cruise."
    },
    {
      day: 4,
      title: "Local Culture Experience",
      description: "Visit a nearby local island to experience authentic Maldivian culture. Participate in traditional craft-making and enjoy local cuisine. Evening at leisure."
    },
    {
      day: 5,
      title: "Luxury Cruise Day",
      description: "Full-day excursion on a luxury yacht. Visit uninhabited islands, enjoy swimming, snorkeling, and a gourmet picnic lunch. Return for a special beachfront dinner."
    },
    {
      day: 6,
      title: "Relaxation & Recreation",
      description: "Morning yoga session followed by breakfast. Day at leisure to enjoy the resort facilities. Optional water sports activities available. Farewell dinner with cultural performance."
    },
    {
      day: 7,
      title: "Departure",
      description: "Enjoy a leisurely breakfast. Check-out and transfer to Malé International Airport for your departure flight."
    }
  ],
  inclusions: [
    "Luxury villa accommodation",
    "Daily breakfast, lunch and dinner",
    "Welcome and farewell dinners",
    "Airport transfers via seaplane",
    "Guided snorkeling sessions",
    "One scuba diving experience",
    "Island hopping excursion",
    "Sunset dolphin cruise",
    "Full-day luxury yacht cruise",
    "Daily yoga sessions",
    "One spa treatment per person"
  ],
  exclusions: [
    "International flights",
    "Travel insurance",
    "Premium alcoholic beverages",
    "Additional spa treatments",
    "Personal expenses and gratuities",
    "Activities not mentioned in the itinerary"
  ],
  faq: [
    {
      question: "What is the best time to visit the Maldives?",
      answer: "The peak season is from November to April when the weather is dry and sunny with little rainfall. May to October is considered the rainy season, but prices are lower and there are fewer tourists."
    },
    {
      question: "Do I need a visa to visit the Maldives?",
      answer: "Most nationalities receive a free 30-day tourist visa on arrival. Your passport must be valid for at least 6 months from the date of arrival."
    },
    {
      question: "Is the package suitable for families with children?",
      answer: "Yes, this package is suitable for families. The resort offers children's activities and family-friendly accommodations. Some activities may have age restrictions."
    },
    {
      question: "What is the cancellation policy?",
      answer: "Full refund if cancelled 30 days before arrival. 50% refund if cancelled 15-29 days before arrival. No refund for cancellations less than 15 days before arrival."
    },
    {
      question: "Are there vegetarian/vegan dining options?",
      answer: "Yes, the resort offers a variety of dining options including vegetarian and vegan menus. Please inform us of any dietary requirements when booking."
    }
  ],
  agency: {
    id: 101,
    name: "Wanderlust Voyages",
    logo: "https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    verified: true,
    rating: 4.8,
    reviewCount: 524,
    yearsInBusiness: 12
  },
  related: [
    {
      id: 2,
      name: "Alpine Adventure Lodge",
      location: "Switzerland",
      image: "https://images.unsplash.com/photo-1580654843061-8c90a9ba24dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
      rating: 4.7,
      price: 1800,
      description: "Nestled in the majestic Swiss Alps, this cozy lodge offers breathtaking mountain views and access to premium ski slopes."
    },
    {
      id: 3,
      name: "Ancient City Explorer",
      location: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4.8,
      price: 1650,
      description: "Immerse yourself in Japanese culture as you explore ancient temples, traditional tea houses, and beautiful cherry blossom gardens."
    },
    {
      id: 5,
      name: "Tuscan Wine Country Villa",
      location: "Florence, Italy",
      image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4.9,
      price: 2100,
      description: "Indulge in the authentic Italian lifestyle with vineyard tours, cooking classes, and relaxation in a private countryside villa."
    }
  ]
};

const PackageDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [travelers, setTravelers] = useState(2);

  // Calculate discounted price
  const discountedPrice = packageData.discount 
    ? packageData.price - (packageData.price * packageData.discount / 100)
    : packageData.price;

  return (
    <div className="pt-16 bg-off-white min-h-screen">
      {/* Gallery section */}
      <section className="bg-white">
        <div className="container-custom py-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[60vh]">
            {/* Main large image */}
            <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
              <img
                src={packageData.images[selectedImage]}
                alt={packageData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-off-black/40 via-transparent to-transparent"></div>
              
              {/* Package name overlay */}
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                  {packageData.name}
                </h1>
                <div className="flex items-center text-white">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{packageData.location}</span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isFavorite ? "fill-red-500 text-red-500" : "text-forest-green"
                    )}
                  />
                </button>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                      aria-label="Share package"
                    >
                      <Share2 className="h-5 w-5 text-forest-green" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="end">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-cream rounded-full transition-colors">
                        <svg className="h-5 w-5 text-forest-green" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-cream rounded-full transition-colors">
                        <svg className="h-5 w-5 text-forest-green" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.163 10.163 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.667 2.476c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-cream rounded-full transition-colors">
                        <svg className="h-5 w-5 text-forest-green" fill="currentColor" viewBox="0 0 448 512">
                          <path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/>
                        </svg>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Smaller images */}
            {packageData.images.slice(1, 5).map((image, index) => (
              <div 
                key={index + 1}
                className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(index + 1)}
              >
                <img
                  src={image}
                  alt={`${packageData.name} view ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Thumbnail navigation */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            {packageData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  selectedImage === index
                    ? "bg-forest-green w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content - 2/3 width on large screens */}
            <div className="lg:w-2/3">
              {/* Overview */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-forest-green mb-1">Overview</h2>
                    <div className="flex items-center text-sm text-muted-blue space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{packageData.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-sand-gold fill-sand-gold mr-1" />
                        <span>{packageData.rating} ({packageData.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    {packageData.discount > 0 && (
                      <div className="bg-sand-gold text-off-black text-xs font-bold px-2 py-1 rounded-full mb-1">
                        {packageData.discount}% OFF
                      </div>
                    )}
                    <div className="text-right">
                      {packageData.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through mr-2">
                          ${packageData.price.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xl font-bold text-forest-green">
                        ${discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-blue"> / person</span>
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-forest-green max-w-none">
                  <p>{packageData.description}</p>
                  <div dangerouslySetInnerHTML={{ __html: packageData.longDescription.replace(/\n/g, "<br/>") }} />
                </div>
              </div>
              
              {/* Itinerary */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h2 className="font-serif text-2xl font-bold text-forest-green mb-6">Itinerary</h2>
                
                <div className="space-y-4">
                  {packageData.itinerary.map((day, index) => (
                    <div
                      key={index}
                      className={cn(
                        "relative pl-8 pb-8",
                        index !== packageData.itinerary.length - 1 ? "border-l-2 border-dashed border-cream" : ""
                      )}
                    >
                      {/* Day indicator */}
                      <div className="absolute left-[-13px] flex items-center justify-center w-6 h-6 rounded-full bg-forest-green text-off-white text-xs font-bold">
                        {day.day}
                      </div>
                      
                      <div className="mb-1">
                        <h3 className="font-serif text-xl font-bold text-forest-green">{day.title}</h3>
                        <p className="text-sm text-muted-blue">Day {day.day}</p>
                      </div>
                      
                      <p className="text-gray-700">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Inclusions & Exclusions */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h2 className="font-serif text-2xl font-bold text-forest-green mb-6">Inclusions & Exclusions</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Inclusions */}
                  <div>
                    <h3 className="flex items-center text-lg font-medium text-forest-green mb-4">
                      <Check className="h-5 w-5 mr-2 text-teal" />
                      What's Included
                    </h3>
                    
                    <ul className="space-y-2">
                      {packageData.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-teal mr-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Exclusions */}
                  <div>
                    <h3 className="flex items-center text-lg font-medium text-forest-green mb-4">
                      <X className="h-5 w-5 mr-2 text-copper" />
                      What's Excluded
                    </h3>
                    
                    <ul className="space-y-2">
                      {packageData.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <X className="h-4 w-4 text-copper mr-2 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* FAQs */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h2 className="font-serif text-2xl font-bold text-forest-green mb-6">Frequently Asked Questions</h2>
                
                <Accordion type="single" collapsible className="w-full">
                  {packageData.faq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium text-forest-green">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              
              {/* Reviews */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-bold text-forest-green">Reviews</h2>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Overall rating */}
                  <div className="md:w-1/3 flex flex-col items-center justify-center bg-cream/50 p-6 rounded-lg">
                    <div className="text-5xl font-bold text-forest-green mb-2">
                      {packageData.rating}
                    </div>
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-5 w-5",
                            star <= Math.round(packageData.rating)
                              ? "text-sand-gold fill-sand-gold"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-muted-blue text-sm">
                      Based on {packageData.reviewCount} reviews
                    </p>
                  </div>
                  
                  {/* Rating breakdown */}
                  <div className="md:w-2/3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      // Mock data for rating distribution
                      const percent = rating === 5 ? 70 : 
                                     rating === 4 ? 20 : 
                                     rating === 3 ? 7 : 
                                     rating === 2 ? 2 : 1;
                      
                      return (
                        <div key={rating} className="flex items-center mb-2">
                          <div className="flex items-center w-16">
                            <span className="text-sm font-medium mr-1">{rating}</span>
                            <Star className="h-3 w-3 text-sand-gold fill-sand-gold" />
                          </div>
                          <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-sand-gold"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="w-12 text-right text-sm text-muted-blue">
                            {percent}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Sample review */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                            alt="User avatar"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-forest-green">Emma Thompson</p>
                          <p className="text-xs text-muted-blue">Visited in June 2023</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 text-sand-gold fill-sand-gold"
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-lg mb-2">An Unforgettable Paradise Experience</h3>
                    <p className="text-gray-700 mb-4">
                      Our trip to the Maldives exceeded all expectations. The overwater villa was absolutely stunning with direct access to crystal clear water. The staff was incredibly attentive, and the food was divine. The snorkeling excursion was a highlight - we saw so many colorful fish and even swam with sea turtles!
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="bg-cream px-3 py-1 text-xs rounded-full text-forest-green">
                        Great Service
                      </div>
                      <div className="bg-cream px-3 py-1 text-xs rounded-full text-forest-green">
                        Beautiful Location
                      </div>
                      <div className="bg-cream px-3 py-1 text-xs rounded-full text-forest-green">
                        Worth the Price
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <button className="text-muted-blue hover:text-forest-green transition-colors">
                        Helpful (24)
                      </button>
                      <span className="mx-2">•</span>
                      <button className="text-muted-blue hover:text-forest-green transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <Button variant="outline" className="mx-auto">
                    View All {packageData.reviewCount} Reviews
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Sidebar - 1/3 width on large screens */}
            <div className="lg:w-1/3 space-y-6">
              {/* Booking card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-20">
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-forest-green mb-4">
                    Book This Package
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    {/* Price display */}
                    <div className="bg-cream/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-forest-green">Price per person</span>
                        <span className="font-bold text-forest-green">
                          ${discountedPrice.toLocaleString()}
                        </span>
                      </div>
                      {packageData.discount > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-blue">You save</span>
                          <span className="text-sand-gold font-medium">
                            ${(packageData.price - discountedPrice).toLocaleString()} ({packageData.discount}%)
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Date selection */}
                    <div>
                      <label className="block text-sm font-medium text-forest-green mb-1">
                        Select Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal border-muted-blue/50",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    {/* Travelers selection */}
                    <div>
                      <label className="block text-sm font-medium text-forest-green mb-1">
                        Number of Travelers
                      </label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(Number(e.target.value))}
                        className="w-full p-2 border border-muted-blue/50 rounded-md focus:outline-none focus:ring-1 focus:ring-forest-green"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Traveler" : "Travelers"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Total calculation */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Package Price</span>
                      <span className="text-sm">${(discountedPrice * travelers).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Taxes & Fees</span>
                      <span className="text-sm">${(discountedPrice * travelers * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-forest-green mt-4 pt-4 border-t border-gray-200">
                      <span>Total</span>
                      <span>${(discountedPrice * travelers * 1.1).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Booking buttons */}
                  <div className="space-y-2">
                    <Button className="w-full bg-forest-green hover:bg-teal text-off-white transition-colors">
                      Book Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Ask a Question
                    </Button>
                  </div>
                </div>
                
                {/* Information box */}
                <div className="bg-cream/40 p-4 border-t border-cream">
                  <div className="flex items-center text-sm text-forest-green mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Free cancellation up to 30 days before departure</span>
                  </div>
                  <div className="flex items-center text-sm text-forest-green">
                    <User className="h-4 w-4 mr-2" />
                    <span>Only {Math.floor(Math.random() * 6) + 2} spots left for this date</span>
                  </div>
                </div>
              </div>
              
              {/* Travel agency card */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-14 w-14 rounded-full overflow-hidden mr-3 border-2 border-cream">
                    <img
                      src={packageData.agency.logo}
                      alt={packageData.agency.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-forest-green mr-2">
                        {packageData.agency.name}
                      </h3>
                      {packageData.agency.verified && (
                        <div className="flex items-center bg-forest-green/10 text-forest-green text-xs px-2 py-0.5 rounded-full">
                          <Award className="h-3 w-3 mr-1" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="h-3 w-3 text-sand-gold fill-sand-gold mr-1" />
                      <span>{packageData.agency.rating} ({packageData.agency.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-5">
                  <p>
                    {packageData.agency.name} has been organizing premium travel experiences for {packageData.agency.yearsInBusiness} years. They specialize in luxury beach destinations and custom-tailored journeys.
                  </p>
                </div>
                
                <Link
                  to={`/agency/${packageData.agency.id}`}
                  className="flex items-center text-forest-green hover:text-teal transition-colors"
                >
                  <span>View Agency Profile</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related packages section */}
      <section className="py-12 bg-cream/50">
        <div className="container-custom">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-forest-green mb-8">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packageData.related.map((item) => (
              <DestinationCard
                key={item.id}
                id={item.id}
                name={item.name}
                location={item.location}
                image={item.image}
                rating={item.rating}
                price={item.price}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetail;
