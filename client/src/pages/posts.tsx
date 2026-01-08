import { Header } from '@/components/Header';
import { Post } from '@/lib/store';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  const publishedPosts = posts.filter((p) => p.published);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center space-y-4 mb-16">
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              Latest Posts
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of AI insights, industry analysis, and
              practical guides.
            </p>
          </div>

          <div className="space-y-6">
            {publishedPosts.map((post) => (
              <article
                key={post.id}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
                data-testid={`card-post-${post.id}`}
              >
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <time>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</time>
                </div>
                <h2 className="font-display text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                  Read more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}

            {publishedPosts.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p>No posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
