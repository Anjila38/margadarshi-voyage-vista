
import { useState } from 'react';
import { Calendar, Search, MapPin, Star, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const popularHotels = [
  {
    id: 1,
    name: 'Grand Plaza Resort',
    location: 'Paris, France',
    price: 220,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi']
  },
  {
    id: 2,
    name: 'Oceanview Luxury Hotel',
    location: 'Cancun, Mexico',
    price: 310,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    amenities: ['Beach Access', 'Pool', 'Spa', 'Free WiFi']
  },
  {
    id: 3,
    name: 'Mountain View Lodge',
    location: 'Zurich, Switzerland',
    price: 275,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
    amenities: ['Mountain View', 'Restaurant', 'Free Parking', 'Free WiFi']
  },
  {
    id: 4,
    name: 'City Center Suites',
    location: 'New York, USA',
    price: 340,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    amenities: ['City View', 'Gym', 'Restaurant', 'Free WiFi']
  },
  {
    id: 5,
    name: 'Beachside Bungalows',
    location: 'Bali, Indonesia',
    price: 190,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    amenities: ['Beach Access', 'Private Pool', 'Free Breakfast', 'Free WiFi']
  },
  {
    id: 6,
    name: 'Historic City Hotel',
    location: 'Rome, Italy',
    price: 245,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    amenities: ['Historic Building', 'Restaurant', 'City Tours', 'Free WiFi']
  }
];

const Hotel = ({ hotel }: { hotel: typeof popularHotels[0] }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-48">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white rounded-md px-2 py-1 text-sm font-medium flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
            {hotel.rating}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-serif text-lg font-bold text-forest-green mb-1">{hotel.name}</h3>
          <div className="flex items-center text-muted-blue text-sm mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            {hotel.location}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.map((amenity, index) => (
              <span key={index} className="bg-cream px-2 py-0.5 rounded text-xs text-forest-green">
                {amenity}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-muted-blue">per night</span>
              <p className="text-xl font-bold text-forest-green">${hotel.price}</p>
            </div>
            <Button className="bg-forest-green text-off-white hover:bg-teal">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Hotels = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [amenities, setAmenities] = useState<string[]>([]);
  
  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };
  
  return (
    <div className="pt-16 min-h-screen bg-off-white">
      {/* Hero section */}
      <div className="relative bg-forest-green">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-off-white mb-4 text-center">
              Find Your Perfect Stay
            </h1>
            <p className="text-center text-off-white/90 mb-8">
              Search over 1 million hotels and accommodations worldwide
            </p>
            
            {/* Search box */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-forest-green mb-1">
                      Where are you going?
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Destination, city, or hotel name"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-forest-green"
                      />
                      <MapPin className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-forest-green mb-1">Check-in</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkIn && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-forest-green mb-1">Check-out</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkOut && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-forest-green mb-1">Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-forest-green"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-forest-green mb-1">Rooms</label>
                      <select
                        value={rooms}
                        onChange={(e) => setRooms(Number(e.target.value))}
                        className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-forest-green"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-forest-green hover:bg-teal text-off-white"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search Hotels
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hotels listing section */}
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold text-forest-green">Filters</h2>
                <Filter className="h-5 w-5 text-forest-green" />
              </div>
              
              {/* Price range */}
              <div className="mb-6">
                <h3 className="font-medium text-forest-green mb-4">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-blue">${priceRange[0]}</span>
                  <span className="text-sm text-muted-blue">${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Star Rating */}
              <div className="mb-6">
                <h3 className="font-medium text-forest-green mb-4">Star Rating</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-forest-green mr-2" />
                      <div className="flex items-center">
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        {Array.from({ length: 5 - rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Amenities */}
              <div>
                <h3 className="font-medium text-forest-green mb-4">Amenities</h3>
                <div className="space-y-3">
                  {['Free WiFi', 'Pool', 'Spa', 'Parking', 'Restaurant', 'Gym', 'Air Conditioning', 'Pet Friendly'].map((amenity) => (
                    <label key={amenity} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded border-gray-300 text-forest-green mr-2" 
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Special deals */}
            <div className="bg-cream/50 p-6 rounded-xl">
              <h3 className="font-serif font-bold text-lg text-forest-green mb-4">Special Deals</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sand-gold font-bold">Last Minute Deal</p>
                  <p className="text-sm text-gray-600">Save up to 25% on hotels when you book within 48 hours of your stay.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sand-gold font-bold">Extended Stay</p>
                  <p className="text-sm text-gray-600">Get 15% off when you book 5 nights or more.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-forest-green">
                Popular Hotels
              </h2>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>Sort By: Recommended</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48 p-0">
                  <div className="py-1">
                    {["Recommended", "Price: Low to High", "Price: High to Low", "Rating", "Popularity"].map((option) => (
                      <button
                        key={option}
                        className="w-full text-left px-4 py-2 hover:bg-cream text-sm transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularHotels.map(hotel => (
                <Hotel key={hotel.id} hotel={hotel} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button className="bg-forest-green hover:bg-teal text-off-white">
                Load More Hotels
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Info section */}
      <div className="bg-cream/30 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-bold text-xl text-forest-green mb-4">Book with Confidence</h3>
              <p className="text-gray-600 mb-4">
                Free cancellation on most hotels. Because flexibility matters.
              </p>
              <Button variant="outline" className="text-forest-green border-forest-green hover:bg-cream">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-bold text-xl text-forest-green mb-4">Price Guarantee</h3>
              <p className="text-gray-600 mb-4">
                Find a lower price? We'll refund the difference.
              </p>
              <Button variant="outline" className="text-forest-green border-forest-green hover:bg-cream">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-serif font-bold text-xl text-forest-green mb-4">Support 24/7</h3>
              <p className="text-gray-600 mb-4">
                Get help at any time during your booking and stay.
              </p>
              <Button variant="outline" className="text-forest-green border-forest-green hover:bg-cream">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
