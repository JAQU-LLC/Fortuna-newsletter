import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Link, useRoute } from 'wouter';
import { useStore } from '@/lib/store';
import { useTranslation } from 'react-i18next';

export default function PostDetail() {
  const { t } = useTranslation();
  const [, params] = useRoute('/posts/:id');
  const { posts } = useStore();
  const postId = params?.id;
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <div className="max-w-md w-full mx-6 text-center">
            <h1 className="font-display text-3xl font-bold mb-4">{t('postDetail.notFound')}</h1>
            <p className="text-muted-foreground mb-8">
              {t('postDetail.notFoundMessage')}
            </p>
            <Link href="/posts">
              <button className="text-primary hover:underline">
                {t('postDetail.backToPosts')}
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-24 pb-16 flex-1">
        <article className="max-w-4xl mx-auto px-6 py-12">
          <Link 
            href="/posts" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('postDetail.backToPosts')}
          </Link>

          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <Calendar className="w-4 h-4" />
            <time>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</time>
          </div>

          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
              {post.content}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

