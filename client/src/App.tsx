import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/Home";
import SearchPage from "@/pages/SearchPage";
import PropertyDetails from "@/pages/PropertyDetails";
import BookingsPage from "@/pages/BookingsPage";
import About from "@/pages/About";
import Help from "@/pages/Help";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />

      <Route path="/about" component={About} />
      <Route path="/help" component={Help} />
      <Route path="/contact" component={Contact} />

      <Route path="/property/:id" component={PropertyDetails} />
      <Route path="/bookings" component={BookingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
