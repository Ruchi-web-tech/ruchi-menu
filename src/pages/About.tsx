
import { MapPin, Phone, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen bg-ruchi-cream/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            
          </h1>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 animate-fade-in">
          <h2 className="font-playfair font-semibold text-2xl text-gray-900 mb-4">
            Our Story
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
            Hey there! At Ruchi, we’re all about mixing up the bold vibes of Asian flavors with the cozy goodness of Northern cuisine in a super fresh, modern way. We love playing with rich sauces, top-notch proteins, and fun twists—like sushi with a fusion kick or bao buns with a little extra flair. It’s not your grandma’s cooking, but it’s packed with flavor and oh-so-tasty. It all started with a spark of curiosity, experimenting with new ideas in the kitchen, and we’ve kept the fire going thanks to the amazing reviews and enthusiastic response from our awesome customers. Come join us for simple, satisfying bites that bring a smile every time!
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Location & Hours */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-playfair font-semibold text-xl text-gray-900 mb-4">
              Visit Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-ruchi-blue mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">Österlånggatan 21<br />Borås 50331, Sweden</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-ruchi-blue mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Hours</p>
                  <p className="text-gray-600">
                    Mon-Thu: 11:00 - 20:00 <br />
                    Fri-Sat: 11:00 - 21:00 <br />
                    Sat: 12:00 - 20:00 <br />
                    Sunday: close 
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-ruchi-blue mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">(46) 0763987181</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-playfair font-semibold text-xl text-gray-900 mb-4">
              What Makes Us Special
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-ruchi-yellow rounded-full"></div>
                <span className="text-gray-600">Fresh ingredients sourced daily</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-ruchi-pink rounded-full"></div>
                <span className="text-gray-600">Traditional cooking techniques</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-ruchi-turquoise rounded-full"></div>
                <span className="text-gray-600">Vegan and gluten-free options</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-ruchi-purple rounded-full"></div>
                <span className="text-gray-600">Made-to-order dishes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-ruchi-blue rounded-full"></div>
                <span className="text-gray-600">Sustainable packaging</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <h3 className="font-playfair font-semibold text-xl text-gray-900 mb-4">
            Follow Us
          </h3>
          <p className="text-gray-600 mb-6">
            Stay updated with our latest dishes, special offers, and restaurant news
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full border-ruchi-blue/20 text-ruchi-blue hover:bg-ruchi-blue hover:text-white"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full border-ruchi-blue/20 text-ruchi-blue hover:bg-ruchi-blue hover:text-white"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full border-ruchi-blue/20 text-ruchi-blue hover:bg-ruchi-blue hover:text-white"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {/* Order CTA */}
          <div className="pt-6 border-t border-gray-100">
            <Button 
              asChild 
              size="lg"
              className="bg-ruchi-blue hover:bg-ruchi-blue/90 text-white px-8 py-3 rounded-full font-medium shadow-lg"
            >
              <a 
                href="https://qopla.com/restaurant/ruchi/qEQLXMQwAr/order" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                🛒 Order Online
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
