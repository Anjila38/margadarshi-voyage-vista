
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Calendar,
  Award, 
  Star,
  CheckCircle,
  MessageCircle,
  ChevronRight,
  Share2,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import DestinationCard from "@/components/ui/DestinationCard";

// Sample agency data
const agencyData = {
  id: 101,
  name: "Wanderlust Voyages",
  logo: "https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
  coverImage: "https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
  verified: true,
  rating: 4.8,
  reviewCount: 524,
  yearsInBusiness: 12,
  specialties: ["Luxury Travel", "Adventure", "Honeymoon", "Family Trips", "Cultural Tours"],
  location: "123 Travel Street, New York, USA",
  phone: "+1 (555) 123-4567",
  email: "info@wanderlustvoyages.com",
  website: "www.wanderlustvoyages.com",
  description: "Wanderlust Voyages is an award-winning travel agency specializing in luxury experiences and adventure tours. For over a decade, our expert consultants have been crafting unforgettable journeys tailored to our clients' preferences. We pride ourselves on attention to detail, personalized service, and creating unique travel experiences that go beyond the ordinary.",
  longDescription: "Founded in 2010, Wanderlust Voyages has grown from a small boutique agency to one of the most respected names in luxury and adventure travel. Our team of experienced travel consultants has collectively visited over 120 countries, providing first-hand knowledge and insights that can't be found in guidebooks.\n\nWe believe that travel should be transformative, educational, and above all, enjoyable. Whether you're looking for a romantic getaway, a family adventure, or a solo expedition, we craft each itinerary with care and precision.\n\nOur partnerships with premium hotels, airlines, and local operators around the world allow us to offer exclusive experiences and benefits to our clients. From private tours of iconic landmarks to dinner reservations at sought-after restaurants, we handle every detail of your journey.\n\nWanderlust Voyages is committed to sustainable and responsible travel. We carefully select partners who share our values and contribute positively to local communities and environments.",
  team: [
    {
      name: "Sarah Johnson",
      position: "Founder & CEO",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      bio: "With over 20 years in the travel industry, Sarah founded Wanderlust Voyages to share her passion for transformative travel experiences."
    },
    {
      name: "Michael Chen",
      position: "Head of Asia Pacific",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      bio: "Michael specializes in luxury Asian destinations and has personally visited every country in the Asia Pacific region."
    },
    {
      name: "Elena Rodriguez",
      position: "Europe Specialist",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1461&q=80",
      bio: "Born in Barcelona, Elena has extensive knowledge of European culture, cuisine, and hidden gems across the continent."
    },
    {
      name: "David Okafor",
      position: "Africa & Middle East Expert",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      bio: "David's passion for African wildlife and cultural experiences makes him our go-to expert for safaris and Middle Eastern adventures."
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "James & Katherine Wilson",
      trip: "Luxury Safari in Tanzania",
      date: "August 2023",
      photo: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 5,
      text: "Our safari experience was absolutely magical. From seeing the Big Five up close to the luxurious accommodations, every detail was perfect. Our guide was knowledgeable and friendly, making the experience even more special."
    },
    {
      id: 2,
      name: "Maria Lopez",
      trip: "Cultural Tour of Japan",
      date: "May 2023",
      photo: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      rating: 5,
      text: "My two-week tour of Japan exceeded all expectations. The itinerary perfectly balanced traditional and modern Japan, and the cherry blossom season was breathtaking. The local guides arranged by Wanderlust Voyages provided insights I wouldn't have found otherwise."
    },
    {
      id: 3,
      name: "Robert & Susan Chang",
      trip: "Anniversary in Maldives",
      date: "February 2023",
      photo: "https://images.unsplash.com/photo-1623091410901-00e2d268ee97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      rating: 4.5,
      text: "Our anniversary trip to the Maldives was a dream come true. The overwater bungalow was stunning, and the private dinner on the beach was the highlight of our stay. The only small issue was a slight delay with our seaplane transfer, but the team handled it professionally."
    }
  ],
  featuredPackages: [
    {
      id: 5,
      name: "Tuscan Wine Country Villa",
      location: "Florence, Italy",
      image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4.9,
      price: 2100,
      description: "Indulge in the authentic Italian lifestyle with vineyard tours, cooking classes, and relaxation in a private countryside villa.",
      tag: "Best Seller"
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
      id: 7,
      name: "Northern Lights Experience",
      location: "Iceland",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4.8,
      price: 2200,
      description: "Witness the magical aurora borealis from your glass-roofed cabin, and explore glaciers, waterfalls, and volcanic landscapes.",
      tag: "Seasonal"
    }
  ],
  accolades: [
    "Best Luxury Travel Agency 2022",
    "Top Adventure Tour Provider 2021",
    "Travel & Leisure Excellence Award 2020",
    "Sustainable Tourism Leadership 2019"
  ],
  partnerships: [
    "Official Partner of National Geographic Expeditions",
    "Certified Virtuoso Agency",
    "Preferred Partner with Four Seasons Hotels & Resorts",
    "Member of Sustainable Travel International"
  ]
};

const AgencyDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div className="pt-16 min-h-screen bg-off-white">
      {/* Cover image section */}
      <div className="relative h-64 md:h-80 bg-forest-green overflow-hidden">
        <img
          src={agencyData.coverImage}
          alt={`${agencyData.name} cover`}
          className="w-full h-full object-cover opacity-60"
        />
        
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
                aria-label="Share agency"
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
                  <svg className="h-5 w-5 text-forest-green" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778C2.007 8.769 2 12 2 12s.007 3.231.403 4.796a2.506 2.506 0 0 0 1.766 1.765c1.566.412 7.83.419 7.83.419s6.265.007 7.831-.404a2.5 2.5 0 0 0 1.767-1.763C21.993 15.231 22 12 22 12s.007-3.231-.407-4.797zM10 15V9l5.177 3L10 15z"/>
                  </svg>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Agency header */}
      <div className="container-custom relative">
        <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-20 mb-8">
          <div className="w-32 h-32 bg-white rounded-lg shadow-md overflow-hidden border-4 border-white flex-shrink-0">
            <img
              src={agencyData.logo}
              alt={agencyData.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-forest-green mr-3">
                {agencyData.name}
              </h1>
              {agencyData.verified && (
                <div className="flex items-center bg-forest-green/10 text-forest-green text-xs px-2 py-0.5 rounded-full">
                  <Award className="h-3 w-3 mr-1" />
                  <span>Verified</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center text-muted-blue text-sm mt-1 gap-x-4 gap-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>New York, USA</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span>{agencyData.rating} ({agencyData.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{agencyData.yearsInBusiness} years in business</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact action buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button className="bg-forest-green hover:bg-teal text-off-white">
            <Mail className="h-4 w-4 mr-2" />
            Contact Agency
          </Button>
          <Button variant="outline" className="border-forest-green text-forest-green hover:bg-forest-green hover:text-off-white">
            <Phone className="h-4 w-4 mr-2" />
            {agencyData.phone}
          </Button>
          <Button variant="outline" className="border-forest-green text-forest-green hover:bg-forest-green hover:text-off-white">
            <Globe className="h-4 w-4 mr-2" />
            Visit Website
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container-custom py-6">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-8">
            {/* About section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-forest-green mb-4">About the Agency</h2>
              <div className="space-y-4 text-gray-700">
                <p>{agencyData.description}</p>
                {agencyData.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            {/* Specialties section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-forest-green mb-4">Specialties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agencyData.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 flex-shrink-0 mt-0.5" />
                    <span>{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Accolades and Partnerships */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-forest-green mb-4">Awards & Accolades</h2>
                <ul className="space-y-2">
                  {agencyData.accolades.map((accolade, index) => (
                    <li key={index} className="flex items-start">
                      <Award className="h-5 w-5 text-sand-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span>{accolade}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-forest-green mb-4">Partnerships</h2>
                <ul className="space-y-2">
                  {agencyData.partnerships.map((partnership, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-forest-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>{partnership}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Contact information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-forest-green mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-forest-green mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-600">{agencyData.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-forest-green mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">{agencyData.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-forest-green mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">{agencyData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-forest-green mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <p className="text-gray-600">{agencyData.website}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full sm:w-auto bg-forest-green text-off-white hover:bg-teal">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="packages">
            {/* Featured packages */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="font-serif text-2xl font-bold text-forest-green mb-6">Featured Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {agencyData.featuredPackages.map((pkg) => (
                  <DestinationCard
                    key={pkg.id}
                    {...pkg}
                  />
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button className="bg-forest-green hover:bg-teal text-off-white">
                  View All Packages
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Request custom package */}
            <div className="bg-cream/30 rounded-xl p-6 shadow-sm">
              <div className="text-center">
                <h3 className="font-serif text-xl font-bold text-forest-green mb-2">Looking for Something Specific?</h3>
                <p className="text-gray-600 mb-4">
                  Don't see what you're looking for? This agency can create custom travel packages tailored to your preferences.
                </p>
                <Button className="bg-forest-green hover:bg-teal text-off-white">
                  Request Custom Package
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="team">
            {/* Team members */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-forest-green mb-6">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agencyData.team.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-forest-green text-lg">{member.name}</h3>
                    <p className="text-muted-blue text-sm mb-2">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            {/* Reviews */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-forest-green">Client Reviews</h2>
                <Button variant="outline">Write a Review</Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                {/* Overall rating */}
                <div className="md:w-1/3 flex flex-col items-center justify-center bg-cream/50 p-6 rounded-lg">
                  <div className="text-5xl font-bold text-forest-green mb-2">
                    {agencyData.rating}
                  </div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-5 w-5",
                          star <= Math.round(agencyData.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-muted-blue text-sm">
                    Based on {agencyData.reviewCount} reviews
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
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        </div>
                        <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
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
              
              {/* Testimonials */}
              <div className="space-y-6 mt-8">
                {agencyData.testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border-b border-gray-100 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={testimonial.photo}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-forest-green">{testimonial.name}</p>
                          <div className="flex items-center text-xs text-muted-blue">
                            <span>{testimonial.trip}</span>
                            <span className="mx-2">•</span>
                            <span>{testimonial.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= Math.floor(testimonial.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : star <= testimonial.rating
                                ? "text-yellow-400 fill-yellow-400 opacity-50"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      {testimonial.text}
                    </p>
                    
                    <div className="flex items-center text-sm">
                      <button className="text-muted-blue hover:text-forest-green transition-colors">
                        Helpful
                      </button>
                      <span className="mx-2">•</span>
                      <button className="text-muted-blue hover:text-forest-green transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" className="mx-auto">
                  View All {agencyData.reviewCount} Reviews
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Similar agencies section */}
      <div className="bg-cream/30 py-12 mt-8">
        <div className="container-custom">
          <h2 className="font-serif text-2xl font-bold text-forest-green mb-6">
            Similar Travel Agencies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Similar agency cards (simplified for brevity) */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <img
                        src={`https://source.unsplash.com/random/100x100?agency=${i}`}
                        alt={`Similar agency ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-forest-green">Travel Agency {i}</h3>
                      <div className="flex items-center text-xs text-muted-blue">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>4.{6 + i}</span>
                        <span className="mx-1">•</span>
                        <span>{300 + i*50} reviews</span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/agency/${200 + i}`}>
                    <Button
                      variant="outline"
                      className="w-full border-forest-green text-forest-green hover:bg-forest-green hover:text-off-white"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/agencies">
              <Button className="bg-forest-green hover:bg-teal text-off-white">
                View All Agencies
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyDetail;
