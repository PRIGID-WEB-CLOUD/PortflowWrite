import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import PortfolioPage from "@/pages/PortfolioPage";
import BlogPage from "@/pages/BlogPage";
import PostPage from "@/pages/PostPage";
import PostEditor from "@/pages/PostEditor";
import ContactPage from "@/pages/ContactPage";
import StorePage from "@/pages/StorePage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <NavigationHeader />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:id" component={PostPage} />
        <Route path="/editor" component={PostEditor} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/store" component={StorePage} />
        <Route path="/store/product/:id" component={ProductDetailPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
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
