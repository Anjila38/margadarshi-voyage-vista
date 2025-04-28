
import { useState } from 'react';
import { Calendar, Search, Map, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const popularDestinations = [
  {
    id: 1,
    from: 'New York',
    to: 'London',
    price: 450,
    departureTime: '08:30 AM',
    arrivalTime: '09:45 PM',
    airline: 'British Airways',
    duration: '7h 15m',
    date: 'Jun 15'
  },
  {
    id: 2,
    from: 'Los Angeles',
    to: 'Tokyo',
    price: 780,
    departureTime: '11:45 AM',
    arrivalTime: '03:20 PM',
    airline: 'Japan Airlines',
    duration: '11h 35m',
    date: 'Jul 22'
  },
  {
    id: 3,
    from: 'Chicago',
    to: 'Paris',
    price: 520,
    departureTime: '06:15 PM',
    arrivalTime: '09:30 AM',
    airline: 'Air France',
    duration: '8h 15m',
    date: 'Aug 5'
  },
  {
    id: 4,
    from: 'San Francisco',
    to: 'Sydney',
    price: 890,
    departureTime: '09:20 PM',
    arrivalTime: '06:45 AM',
    airline: 'Qantas',
    duration: '15h 25m',
    date: 'Sep 10'
  },
  {
    id: 5,
    from: 'Miami',
    to: 'Rome',
    price: 610,
    departureTime: '02:30 PM',
    arrivalTime: '07:15 AM',
    airline: 'Alitalia',
    duration: '9h 45m',
    date: 'Oct 18'
  },
  {
    id: 6,
    from: 'Seattle',
    to: 'Bangkok',
    price: 720,
    departureTime: '10:45 AM',
    arrivalTime: '04:30 PM',
    airline: 'Thai Airways',
    duration: '17h 45m',
    date: 'Nov 22'
  }
];

const Flights = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  
  return (
    <div className="pt-16 min-h-screen bg-off-white">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-forest-green to-teal">
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-off-white mb-4 text-center">
              Find and Book Flights
            </h1>
            <p className="text-center text-off-white/90 mb-8">
              Compare prices from hundreds of airlines and book your perfect flight
            </p>
            
            {/* Search box */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <Tabs defaultValue="roundtrip" className="p-4 pb-0">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
                  <TabsTrigger value="oneway">One Way</TabsTrigger>
                  <TabsTrigger value="multicity">Multi-City</TabsTrigger>
                </TabsList>
                
                <TabsContent value="roundtrip">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">From</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="City or Airport"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-forest-green"
                          />
                          <Map className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">To</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="City or Airport"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-forest-green"
                          />
                          <Map className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">Departure Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !departDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {departDate ? format(departDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={departDate}
                              onSelect={setDepartDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">Return Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !returnDate && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={returnDate}
                              onSelect={setReturnDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">Passengers</label>
                        <select
                          value={passengers}
                          onChange={(e) => setPassengers(Number(e.target.value))}
                          className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-forest-green"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="oneway">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">From</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="City or Airport"
                            className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-forest-green"
                          />
                          <Map className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">To</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="City or Airport"
                            className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-forest-green"
                          />
                          <Map className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">Departure Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal text-muted-foreground"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>Pick a date</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">Passengers</label>
                        <select
                          className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-forest-green"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="multicity">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">From</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="City or Airport"
                            className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-forest-green"
                          />
                          <Map className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">To</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="City or Airport"
                            className="w-full p-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-forest-green"
                          />
                          <Map className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-forest-green mb-1">Departure Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal text-muted-foreground"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>Pick a date</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="md:col-span-2">
                        <Button className="mt-7 w-full md:w-auto" variant="outline">
                          + Add another flight
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-forest-green mb-1">Passengers</label>
                      <select
                        className="w-full md:w-40 p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-forest-green"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </TabsContent>
                
                <div className="mt-6 px-4 py-4 bg-cream/30 rounded-lg">
                  <Button 
                    className="w-full md:w-auto bg-forest-green hover:bg-teal text-off-white"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search Flights
                  </Button>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular flights section */}
      <div className="container-custom py-12">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-forest-green mb-8">
          Popular Flights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((flight) => (
            <Card key={flight.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">{flight.date}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-lg font-medium">{flight.from}</span>
                        <ArrowRight className="mx-2 h-4 w-4 text-gray-400" />
                        <span className="text-lg font-medium">{flight.to}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-blue">from</p>
                      <p className="text-xl font-bold text-forest-green">${flight.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm border-t border-gray-100 pt-4">
                    <div>
                      <p className="font-medium text-gray-700">{flight.airline}</p>
                      <p className="text-gray-500">{flight.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500">{flight.departureTime}</p>
                      <p className="text-gray-500">{flight.arrivalTime}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-cream/30 px-6 py-3 flex justify-between items-center">
                  <span className="text-sm text-muted-blue">Economy</span>
                  <Button className="bg-forest-green hover:bg-teal text-off-white">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button className="bg-forest-green hover:bg-teal text-off-white">
            View All Flights
          </Button>
        </div>
      </div>
      
      {/* Features section */}
      <div className="bg-cream/30 py-12">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-forest-green mb-8 text-center">
            Why Book With Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-forest-green" />
              </div>
              <h3 className="font-medium text-lg mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600 text-sm">Find a lower price? We'll match it and give you an additional discount.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-forest-green" />
              </div>
              <h3 className="font-medium text-lg mb-2">Flexible Booking</h3>
              <p className="text-gray-600 text-sm">Plans change? No problem. Modify your flight dates with minimal or no fees.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">No Hidden Fees</h3>
              <p className="text-gray-600 text-sm">See the total price upfront with no surprise charges at checkout.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Our customer service team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
