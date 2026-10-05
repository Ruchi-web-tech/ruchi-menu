
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { BannerBar } from "@/components/DailyBanner";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import About from "@/pages/About";
import Order from "@/pages/Order";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { useMenuStore } from "@/store/menuStore";
import { useRestaurantJsonLd } from "@/lib/seo";

const queryClient = new QueryClient();

const App = () => {
  const loadLiveContent = useMenuStore((s) => s.loadLiveContent);
  const info = useMenuStore((s) => s.info);

  // Restaurant details for Google, kept in step with the live hours
  useRestaurantJsonLd(info);

  // Pull the latest menu + opening hours from the operations app
  useEffect(() => {
    loadLiveContent();
  }, [loadLiveContent]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-ruchi-cream">
            <BannerBar />
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/order" element={<Order />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
