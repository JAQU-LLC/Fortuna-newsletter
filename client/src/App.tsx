import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useStore } from "./lib/store";
import Home from "@/pages/home";
import Posts from "@/pages/posts";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

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
      <Route path="/">
        <Home onSubscribe={addSubscriber} />
      </Route>
      <Route path="/posts">
        <Posts posts={posts} />
      </Route>
      <Route path="/admin">
        <AdminLogin onLogin={login} />
      </Route>
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
