import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavigationHeader from "@/components/NavigationHeader";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import BlogPage from "@/pages/BlogPage";
import PostPage from "@/pages/PostPage";
import PostEditor from "@/pages/PostEditor";
import ContactPage from "@/pages/ContactPage";
import StorePage from "@/pages/StorePage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <NavigationHeader />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:id" component={PostPage} />
        <Route path="/editor" component={PostEditor} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/store" component={StorePage} />
        <Route component={NotFound} />
      </Switch>
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
