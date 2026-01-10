import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// User facing pages
import Home from "@/pages/user/Home";
import Posts from "@/pages/user/Posts";
import PostDetail from "@/pages/user/PostDetail";

// TODO: 
// This will be connected with STRIPE payments
import Payment from "@/pages/user/Payment";
// Hidden Admin pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
// Footer
import Privacy from "@/pages/user/Privacy";
import Terms from "@/pages/user/Terms";
// Not Found
import NotFound from "@/pages/user/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/admin/dashboard">
        <AdminDashboard />
      </Route>
      <Route path="/admin">
        <AdminLogin />
      </Route>
      <Route path="/posts/:id">
        <PostDetail />
      </Route>
      <Route path="/posts">
        <Posts />
      </Route>
      <Route path="/payment">
        <Payment />
      </Route>
      <Route path="/privacy">
        <Privacy />
      </Route>
      <Route path="/terms">
        <Terms />
      </Route>
      <Route path="/">
        <Home />
      </Route>
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
