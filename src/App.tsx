
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import PackageDetail from "./pages/PackageDetail";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Destinations from "./pages/Destinations";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Packages from "./pages/Packages";
import Agencies from "./pages/Agencies";
import AgencyDetail from "./pages/AgencyDetail";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/package/:id" element={<PackageDetail />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/agency/:id" element={<AgencyDetail />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
