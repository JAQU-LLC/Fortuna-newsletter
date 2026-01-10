import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/useToast';
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
  FileText,
  Edit,
  Trash2,
} from 'lucide-react';
import { format } from 'date-fns';
import logoUrl from '@assets/logo.png';
import { useTranslation } from 'react-i18next';
import { getPlanConfig, setPlanConfig, type PlanId, type PlanConfig } from '@/lib/planConfig';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import { useIsAdmin, useLogout } from '@/hooks/useAuth';
import { useSubscribers, useUpdateSubscriber } from '@/hooks/useSubscribers';
import { usePosts, useCreatePost, useUpdatePost, useDeletePost } from '@/hooks/usePosts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Post } from '@/models/post';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const { toast } = useToast();
  const { t } = useTranslation();
  const [planConfig, setPlanConfigState] = useState<PlanConfig>(getPlanConfig());
  
  // React Query hooks
  const isAdmin = useIsAdmin();
  const { data: subscribersData, isLoading: subscribersLoading } = useSubscribers();
  const { data: postsData, isLoading: postsLoading } = usePosts(); // Admin sees all posts
  const createPostMutation = useCreatePost();
  const updateSubscriberMutation = useUpdateSubscriber();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();
  const logoutMutation = useLogout();

  // State for Posts management tab
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostContent, setEditPostContent] = useState('');
  const [editPostPublished, setEditPostPublished] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [postSearchQuery, setPostSearchQuery] = useState('');

  if (!isAdmin) {
    setLocation('/admin');
    return null;
  }

  const subscribers = subscribersData?.subscribers || [];
  const posts = postsData?.posts || [];

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(postSearchQuery.toLowerCase())
  );
  
  const handlePublishPost = () => {
    if (!postTitle.trim() || !postContent.trim()) {
      toast({
        title: t('admin.dashboard.writePost.messages.fillAllFields'),
        variant: 'destructive',
      });
      return;
    }
    createPostMutation.mutate(
      {
        title: postTitle,
        content: postContent,
        published: true,
      },
      {
        onSuccess: () => {
          setPostTitle('');
          setPostContent('');
        },
      }
    );
  };

  const handleToggleSubscriber = (id: string) => {
    const subscriber = subscribers.find((s) => s._id === id);
    if (!subscriber) return;

    updateSubscriberMutation.mutate({
      id,
      data: {
        is_active: !subscriber.is_active,
      },
    });
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
    setEditPostPublished(post.published);
  };

  const handleSaveEditPost = () => {
    if (!editingPost || !editPostTitle.trim() || !editPostContent.trim()) {
      toast({
        title: t('admin.dashboard.writePost.messages.fillAllFields'),
        variant: 'destructive',
      });
      return;
    }

    updatePostMutation.mutate(
      {
        id: editingPost.id,
        data: {
          title: editPostTitle,
          content: editPostContent,
          published: editPostPublished,
        },
      },
      {
        onSuccess: () => {
          setEditingPost(null);
          setEditPostTitle('');
          setEditPostContent('');
          setEditPostPublished(false);
        },
      }
    );
  };

  const handleDeletePost = (id: string) => {
    deletePostMutation.mutate(id, {
      onSuccess: () => {
        setDeletingPostId(null);
      },
    });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
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
    // If setting a plan as most popular, remove it from disabled plans (mutually exclusive)
    const disabledPlans = planId 
      ? planConfig.disabledPlans.filter(id => id !== planId)
      : planConfig.disabledPlans;
    handlePlanConfigChange({ ...planConfig, mostPopular: planId, disabledPlans });
  };

  const handleDisabledPlansChange = (planId: PlanId, disabled: boolean) => {
    const disabledPlans = disabled
      ? [...planConfig.disabledPlans, planId]
      : planConfig.disabledPlans.filter(id => id !== planId);
    
    // If disabling a plan, remove it from most popular (mutually exclusive)
    const mostPopular = disabled && planConfig.mostPopular === planId 
      ? null 
      : planConfig.mostPopular;
    
    handlePlanConfigChange({ ...planConfig, disabledPlans, mostPopular });
  };

  const activeCount = subscribers.filter((s) => s.is_active).length;

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
              value="posts"
              className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              data-testid="tab-posts"
            >
              <FileText className="w-4 h-4 mr-2" />
              {t('admin.dashboard.tabs.posts', { defaultValue: 'Posts' })}
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
                    {t('admin.dashboard.writePost.labels.postContent')} (Markdown)
                  </Label>
                  <div data-color-mode="light" className="[&_.w-md-editor]:rounded-xl [&_.w-md-editor-text]:min-h-[300px]">
                    <MDEditor
                      value={postContent}
                      onChange={(value: string | undefined) => setPostContent(value || '')}
                      preview="edit"
                      hideToolbar={false}
                      visibleDragbar={false}
                      textareaProps={{
                        placeholder: t('admin.dashboard.writePost.placeholders.content'),
                        style: { fontSize: '14px', fontFamily: 'inherit' },
                      }}
                      data-testid="input-post-content"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('admin.dashboard.writePost.markdownHint', { defaultValue: 'You can use Markdown formatting. Click the eye icon to preview.' })}
                  </p>
                </div>
                <Button
                  onClick={handlePublishPost}
                  className="h-12 px-8 rounded-xl font-semibold"
                  disabled={createPostMutation.isPending}
                  data-testid="button-publish"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {createPostMutation.isPending 
                    ? t('common.loading', { defaultValue: 'Publishing...' })
                    : t('admin.dashboard.writePost.publish')}
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
                        key={subscriber._id}
                        className="hover:bg-muted/30 transition-colors"
                        data-testid={`row-subscriber-${subscriber._id}`}
                      >
                        <td className="px-6 py-4 text-sm font-medium">
                          {subscriber.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground" data-testid={`text-email-${subscriber._id}`}>
                          {subscriber.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {format(new Date(subscriber.subscribed_at), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              subscriber.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                            data-testid={`status-subscriber-${subscriber._id}`}
                          >
                            {subscriber.is_active ? t('admin.dashboard.subscribers.status.active') : t('admin.dashboard.subscribers.status.inactive')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant={subscriber.is_active ? 'destructive' : 'default'}
                            size="sm"
                            onClick={() => handleToggleSubscriber(subscriber._id)}
                            className="h-9 px-4 rounded-lg"
                            disabled={updateSubscriberMutation.isPending}
                            data-testid={`button-toggle-${subscriber._id}`}
                          >
                            {subscriber.is_active ? (
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
                {subscribersLoading && (
                  <div className="text-center py-12 text-muted-foreground">
                    {t('common.loading', { defaultValue: 'Loading...' })}
                  </div>
                )}
                {!subscribersLoading && filteredSubscribers.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    {t('admin.dashboard.subscribers.noResults')}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="mt-6">
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold">
                  {t('admin.dashboard.posts.title', { defaultValue: 'Manage Posts' })}
                </h2>
                <div className="relative w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t('admin.dashboard.posts.searchPlaceholder', { defaultValue: 'Search posts by title...' })}
                    value={postSearchQuery}
                    onChange={(e) => setPostSearchQuery(e.target.value)}
                    className="pl-11 h-11 rounded-xl"
                    data-testid="input-search-posts"
                  />
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold">
                        {t('admin.dashboard.posts.table.title', { defaultValue: 'Title' })}
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">
                        {t('admin.dashboard.posts.table.created', { defaultValue: 'Created' })}
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">
                        {t('admin.dashboard.posts.table.status', { defaultValue: 'Status' })}
                      </th>
                      <th className="text-right px-6 py-4 text-sm font-semibold">
                        {t('admin.dashboard.posts.table.actions', { defaultValue: 'Actions' })}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {postsLoading && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                          {t('common.loading', { defaultValue: 'Loading...' })}
                        </td>
                      </tr>
                    )}
                    {!postsLoading && filteredPosts.map((post) => (
                      <tr
                        key={post.id}
                        className="hover:bg-muted/30 transition-colors"
                        data-testid={`row-post-${post.id}`}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {post.excerpt}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {format(new Date(post.createdAt), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={post.published ? 'default' : 'secondary'}>
                            {post.published 
                              ? t('admin.dashboard.posts.status.published', { defaultValue: 'Published' })
                              : t('admin.dashboard.posts.status.draft', { defaultValue: 'Draft' })}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditPost(post)}
                              className="h-9 px-4 rounded-lg"
                              disabled={updatePostMutation.isPending || deletePostMutation.isPending}
                              data-testid={`button-edit-post-${post.id}`}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              {t('admin.dashboard.posts.actions.edit', { defaultValue: 'Edit' })}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setDeletingPostId(post.id)}
                              className="h-9 px-4 rounded-lg"
                              disabled={updatePostMutation.isPending || deletePostMutation.isPending}
                              data-testid={`button-delete-post-${post.id}`}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              {t('admin.dashboard.posts.actions.delete', { defaultValue: 'Delete' })}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!postsLoading && filteredPosts.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    {t('admin.dashboard.posts.noResults', { defaultValue: 'No posts found' })}
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
                    {(['free', 'standard', 'premium'] as PlanId[]).map((planId) => {
                      const isDisabled = planConfig.disabledPlans.includes(planId);
                      return (
                        <div key={planId} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={planId} 
                            id={`popular-${planId}`}
                            disabled={isDisabled}
                          />
                          <Label 
                            htmlFor={`popular-${planId}`} 
                            className={`font-normal ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                          >
                            {t(`admin.dashboard.plans.plans.${planId}`)}
                            {isDisabled && ' (Disabled)'}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">
                    {t('admin.dashboard.plans.disabledPlans')}
                  </Label>
                  <div className="space-y-3">
                    {(['free', 'standard', 'premium'] as PlanId[]).map((planId) => {
                      const isMostPopular = planConfig.mostPopular === planId;
                      return (
                        <div key={planId} className="flex items-center space-x-2">
                          <Checkbox
                            id={`disabled-${planId}`}
                            checked={planConfig.disabledPlans.includes(planId)}
                            onCheckedChange={(checked) => handleDisabledPlansChange(planId, checked === true)}
                            disabled={isMostPopular}
                          />
                          <Label 
                            htmlFor={`disabled-${planId}`} 
                            className={`font-normal ${isMostPopular ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                          >
                            {t(`admin.dashboard.plans.plans.${planId}`)}
                            {isMostPopular && ' (Most Popular)'}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Post Dialog */}
      <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {t('admin.dashboard.editPost.title', { defaultValue: 'Edit Post' })}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-sm font-medium">
                {t('admin.dashboard.writePost.labels.postTitle')}
              </Label>
              <Input
                id="edit-title"
                type="text"
                placeholder={t('admin.dashboard.writePost.placeholders.title')}
                value={editPostTitle}
                onChange={(e) => setEditPostTitle(e.target.value)}
                className="h-12 px-4 rounded-xl"
                data-testid="input-edit-post-title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content" className="text-sm font-medium">
                {t('admin.dashboard.writePost.labels.postContent')} (Markdown)
              </Label>
              <div data-color-mode="light" className="[&_.w-md-editor]:rounded-xl [&_.w-md-editor-text]:min-h-[300px]">
                <MDEditor
                  value={editPostContent}
                  onChange={(value: string | undefined) => setEditPostContent(value || '')}
                  preview="edit"
                  hideToolbar={false}
                  visibleDragbar={false}
                  textareaProps={{
                    placeholder: t('admin.dashboard.writePost.placeholders.content'),
                    style: { fontSize: '14px', fontFamily: 'inherit' },
                  }}
                  data-testid="input-edit-post-content"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-published"
                checked={editPostPublished}
                onCheckedChange={setEditPostPublished}
                data-testid="switch-edit-post-published"
              />
              <Label htmlFor="edit-published" className="text-sm font-medium">
                {t('admin.dashboard.editPost.published', { defaultValue: 'Published' })}
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditingPost(null);
                setEditPostTitle('');
                setEditPostContent('');
                setEditPostPublished(false);
              }}
              disabled={updatePostMutation.isPending}
            >
              {t('common.cancel', { defaultValue: 'Cancel' })}
            </Button>
            <Button
              onClick={handleSaveEditPost}
              disabled={updatePostMutation.isPending}
              data-testid="button-save-edit-post"
            >
              {updatePostMutation.isPending
                ? t('common.loading', { defaultValue: 'Saving...' })
                : t('common.save', { defaultValue: 'Save' })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Post Confirmation Dialog */}
      <AlertDialog open={!!deletingPostId} onOpenChange={(open) => !open && setDeletingPostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('admin.dashboard.posts.delete.confirmTitle', { defaultValue: 'Delete Post' })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.dashboard.posts.delete.confirmMessage', {
                defaultValue: 'Are you sure you want to delete this post? This action cannot be undone.',
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePostMutation.isPending}>
              {t('common.cancel', { defaultValue: 'Cancel' })}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingPostId && handleDeletePost(deletingPostId)}
              disabled={deletePostMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete-post"
            >
              {deletePostMutation.isPending
                ? t('common.loading', { defaultValue: 'Deleting...' })
                : t('admin.dashboard.posts.delete.confirm', { defaultValue: 'Delete' })}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
