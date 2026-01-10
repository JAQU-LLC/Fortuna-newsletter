import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  PenSquare,
  Users,
  LogOut,
  Search,
  UserX,
  UserCheck,
  Send,
  Home,
  Settings,
} from 'lucide-react';
import { Subscriber, Post } from '@/lib/store';
import { format } from 'date-fns';
import logoUrl from '@assets/logo.png';
import { useTranslation } from 'react-i18next';
import { getPlanConfig, setPlanConfig, type PlanId, type PlanConfig } from '@/lib/planConfig';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface AdminDashboardProps {
  isAdmin: boolean;
  subscribers: Subscriber[];
  posts: Post[];
  onToggleSubscriber: (id: string) => void;
  onAddPost: (title: string, content: string) => void;
  onLogout: () => void;
}

export default function AdminDashboard({
  isAdmin,
  subscribers,
  posts,
  onToggleSubscriber,
  onAddPost,
  onLogout,
}: AdminDashboardProps) {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const { toast } = useToast();
  const { t } = useTranslation();
  const [planConfig, setPlanConfigState] = useState<PlanConfig>(getPlanConfig());

  if (!isAdmin) {
    setLocation('/admin');
    return null;
  }

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handlePublishPost = () => {
    if (!postTitle.trim() || !postContent.trim()) {
      toast({
        title: t('admin.dashboard.writePost.messages.fillAllFields'),
        variant: 'destructive',
      });
      return;
    }
    onAddPost(postTitle, postContent);
    setPostTitle('');
    setPostContent('');
    toast({
      title: t('admin.dashboard.writePost.messages.postPublished'),
      description: t('admin.dashboard.writePost.messages.postLive'),
    });
  };

  const handleLogout = () => {
    onLogout();
    setLocation('/');
  };

  const handlePlanConfigChange = (newConfig: PlanConfig) => {
    setPlanConfigState(newConfig);
    setPlanConfig(newConfig);
    toast({
      title: t('admin.dashboard.plans.saved'),
      description: 'Plan settings have been updated.',
    });
  };

  const handleMostPopularChange = (planId: PlanId | null) => {
    handlePlanConfigChange({ ...planConfig, mostPopular: planId });
  };

  const handleDisabledPlansChange = (planId: PlanId, disabled: boolean) => {
    const disabledPlans = disabled
      ? [...planConfig.disabledPlans, planId]
      : planConfig.disabledPlans.filter(id => id !== planId);
    handlePlanConfigChange({ ...planConfig, disabledPlans });
  };

  const activeCount = subscribers.filter((s) => s.active).length;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-secondary text-secondary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoUrl} alt="Fortuna.ai" className="h-7 w-auto" />
            <span className="text-sm opacity-70">{t('admin.dashboard.title')}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm opacity-70 hover:opacity-100 flex items-center gap-2"
              data-testid="link-view-site"
            >
              <Home className="w-4 h-4" />
              {t('admin.dashboard.viewSite')}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-secondary-foreground/10"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('admin.dashboard.logout')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="text-sm text-muted-foreground mb-1">
              {t('admin.dashboard.stats.totalSubscribers')}
            </div>
            <div className="text-3xl font-display font-bold" data-testid="text-total-subscribers">
              {subscribers.length}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="text-sm text-muted-foreground mb-1">
              {t('admin.dashboard.stats.activeSubscribers')}
            </div>
            <div className="text-3xl font-display font-bold text-green-600" data-testid="text-active-subscribers">
              {activeCount}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="text-sm text-muted-foreground mb-1">
              {t('admin.dashboard.stats.publishedPosts')}
            </div>
            <div className="text-3xl font-display font-bold text-primary" data-testid="text-total-posts">
              {posts.filter((p) => p.published).length}
            </div>
          </div>
        </div>

        <Tabs defaultValue="write" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto">
            <TabsTrigger
              value="write"
              className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              data-testid="tab-write"
            >
              <PenSquare className="w-4 h-4 mr-2" />
              {t('admin.dashboard.tabs.write')}
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              data-testid="tab-users"
            >
              <Users className="w-4 h-4 mr-2" />
              {t('admin.dashboard.tabs.users')}
            </TabsTrigger>
            <TabsTrigger
              value="plans"
              className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              data-testid="tab-plans"
            >
              <Settings className="w-4 h-4 mr-2" />
              {t('admin.dashboard.tabs.plans')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="mt-6">
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="font-display text-xl font-semibold mb-6">
                {t('admin.dashboard.writePost.title')}
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    {t('admin.dashboard.writePost.labels.postTitle')}
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder={t('admin.dashboard.writePost.placeholders.title')}
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="h-12 px-4 rounded-xl"
                    data-testid="input-post-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">
                    {t('admin.dashboard.writePost.labels.postContent')}
                  </Label>
                  <Textarea
                    id="content"
                    placeholder={t('admin.dashboard.writePost.placeholders.content')}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="min-h-[300px] px-4 py-3 rounded-xl resize-none"
                    data-testid="input-post-content"
                  />
                </div>
                <Button
                  onClick={handlePublishPost}
                  className="h-12 px-8 rounded-xl font-semibold"
                  data-testid="button-publish"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t('admin.dashboard.writePost.publish')}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold">
                  {t('admin.dashboard.subscribers.title')}
                </h2>
                <div className="relative w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t('admin.dashboard.subscribers.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 h-11 rounded-xl"
                    data-testid="input-search-users"
                  />
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold">
                        {t('admin.dashboard.subscribers.table.name')}
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">
                        {t('admin.dashboard.subscribers.table.email')}
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">
                        {t('admin.dashboard.subscribers.table.subscribed')}
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">
                        {t('admin.dashboard.subscribers.table.status')}
                      </th>
                      <th className="text-right px-6 py-4 text-sm font-semibold">
                        {t('admin.dashboard.subscribers.table.action')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredSubscribers.map((subscriber) => (
                      <tr
                        key={subscriber.id}
                        className="hover:bg-muted/30 transition-colors"
                        data-testid={`row-subscriber-${subscriber.id}`}
                      >
                        <td className="px-6 py-4 text-sm font-medium">
                          {subscriber.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground" data-testid={`text-email-${subscriber.id}`}>
                          {subscriber.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {format(new Date(subscriber.subscribedAt), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              subscriber.active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                            data-testid={`status-subscriber-${subscriber.id}`}
                          >
                            {subscriber.active ? t('admin.dashboard.subscribers.status.active') : t('admin.dashboard.subscribers.status.inactive')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant={subscriber.active ? 'destructive' : 'default'}
                            size="sm"
                            onClick={() => onToggleSubscriber(subscriber.id)}
                            className="h-9 px-4 rounded-lg"
                            data-testid={`button-toggle-${subscriber.id}`}
                          >
                            {subscriber.active ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                {t('admin.dashboard.subscribers.actions.deactivate')}
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                {t('admin.dashboard.subscribers.actions.activate')}
                              </>
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredSubscribers.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    {t('admin.dashboard.subscribers.noResults')}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="mt-6">
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="font-display text-xl font-semibold mb-6">
                {t('admin.dashboard.plans.title')}
              </h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">
                    {t('admin.dashboard.plans.mostPopular')}
                  </Label>
                  <RadioGroup
                    value={planConfig.mostPopular || 'none'}
                    onValueChange={(value) => handleMostPopularChange(value === 'none' ? null : value as PlanId)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="popular-none" />
                      <Label htmlFor="popular-none" className="font-normal cursor-pointer">
                        None
                      </Label>
                    </div>
                    {(['free', 'standard', 'premium'] as PlanId[]).map((planId) => (
                      <div key={planId} className="flex items-center space-x-2">
                        <RadioGroupItem value={planId} id={`popular-${planId}`} />
                        <Label htmlFor={`popular-${planId}`} className="font-normal cursor-pointer">
                          {t(`admin.dashboard.plans.plans.${planId}`)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">
                    {t('admin.dashboard.plans.disabledPlans')}
                  </Label>
                  <div className="space-y-3">
                    {(['free', 'standard', 'premium'] as PlanId[]).map((planId) => (
                      <div key={planId} className="flex items-center space-x-2">
                        <Checkbox
                          id={`disabled-${planId}`}
                          checked={planConfig.disabledPlans.includes(planId)}
                          onCheckedChange={(checked) => handleDisabledPlansChange(planId, checked === true)}
                        />
                        <Label htmlFor={`disabled-${planId}`} className="font-normal cursor-pointer">
                          {t(`admin.dashboard.plans.plans.${planId}`)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
