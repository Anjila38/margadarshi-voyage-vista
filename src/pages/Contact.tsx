
import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this data to a server
    console.log('Form submitted:', formState);
    
    // Show success message
    setSubmitted(true);
    
    // Reset form
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="pt-16 min-h-screen bg-off-white">
      {/* Hero section */}
      <div className="bg-forest-green py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-off-white mb-4">
            Contact Us
          </h1>
          <p className="text-off-white/80 max-w-2xl mx-auto">
            Have questions or need assistance planning your next adventure? Our travel experts are here to help.
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-forest-green mb-6">
              Send Us a Message
            </h2>
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-green-600 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for reaching out. One of our travel experts will get back to you shortly.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)} 
                  className="mt-6 bg-forest-green hover:bg-teal text-off-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-forest-green mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="border-gray-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-forest-green mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="border-gray-300"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-forest-green mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="border-gray-300"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-forest-green mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="border-gray-300"
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-forest-green hover:bg-teal text-off-white">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
          
          {/* Contact information */}
          <div>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-6">
              <h2 className="font-serif text-2xl font-bold text-forest-green mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-5">
                <div className="flex">
                  <div className={cn(
                    "w-12 h-12 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mr-4"
                  )}>
                    <MapPin className="h-6 w-6 text-forest-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-forest-green mb-1">Our Location</h3>
                    <p className="text-gray-600">123 Travel Street</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className={cn(
                    "w-12 h-12 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mr-4"
                  )}>
                    <Mail className="h-6 w-6 text-forest-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-forest-green mb-1">Email Us</h3>
                    <p className="text-gray-600">info@margadarshi.com</p>
                    <p className="text-gray-600">support@margadarshi.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className={cn(
                    "w-12 h-12 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mr-4"
                  )}>
                    <Phone className="h-6 w-6 text-forest-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-forest-green mb-1">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-forest-green mb-6">
                Our Office Hours
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>Closed</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <p className="text-muted-blue">
                    *All times are in Eastern Standard Time (EST)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ section */}
        <div className="bg-cream/30 rounded-xl p-8 shadow-sm mt-12">
          <h2 className="font-serif text-2xl font-bold text-forest-green mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="font-medium text-forest-green text-lg mb-2">
                How do I book a package?
              </h3>
              <p className="text-gray-600">
                You can book directly through our website or contact our customer service team for assistance with your booking.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-forest-green text-lg mb-2">
                What is your cancellation policy?
              </h3>
              <p className="text-gray-600">
                Our standard policy allows cancellations up to 30 days before departure for a full refund. Specific packages may have different terms.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-forest-green text-lg mb-2">
                Do you offer travel insurance?
              </h3>
              <p className="text-gray-600">
                Yes, we offer comprehensive travel insurance options to protect your trip investment. Contact us for details.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-forest-green text-lg mb-2">
                Can I customize a package?
              </h3>
              <p className="text-gray-600">
                Absolutely! We specialize in creating custom travel experiences. Contact our team with your preferences.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-forest-green hover:bg-teal text-off-white">
              View All FAQs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
