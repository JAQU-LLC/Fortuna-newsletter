import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useStore } from "./lib/store";

// User facing pages
import Home from "@/pages/user/home";
import Posts from "@/pages/user/posts";
import PostDetail from "@/pages/user/post-detail";

// TODO: 
// This will be connected with STRIPE payments
import Payment from "@/pages/user/payment";
// Hidden Admin pages
import AdminLogin from "@/pages/admin/admin-login";
import AdminDashboard from "@/pages/admin/admin-dashboard";
// Footer
import Privacy from "@/pages/user/privacy";
import Terms from "@/pages/user/terms";
// Not Found
import NotFound from "@/pages/user/not-found";

function Router() {
  const {
    subscribers,
    posts,
    isAdmin,
    addSubscriber,
    toggleSubscriberStatus,
    addPost,
    login,
    logout,
  } = useStore();

  return (
    <Switch>
      <Route path="/admin/dashboard">
        <AdminDashboard
          isAdmin={isAdmin}
          subscribers={subscribers}
          posts={posts}
          onToggleSubscriber={toggleSubscriberStatus}
          onAddPost={addPost}
          onLogout={logout}
        />
      </Route>
      <Route path="/admin">
        <AdminLogin onLogin={login} />
      </Route>
      <Route path="/posts/:id">
        <PostDetail />
      </Route>
      <Route path="/posts">
        <Posts posts={posts} />
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
