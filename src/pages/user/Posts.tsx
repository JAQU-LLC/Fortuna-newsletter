import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { usePosts } from "@/hooks/usePosts";

export default function Posts() {
  const { t } = useTranslation();
  const { data: postsData, isLoading, error } = usePosts(true); // Only published posts for public

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="pt-24 pb-16 flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>{t("common.loading", { defaultValue: "Loading..." })}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="pt-24 pb-16 flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>
              {t("posts.error", {
                defaultValue: "Failed to load posts. Please try again later.",
              })}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const publishedPosts = postsData?.posts || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-24 pb-16 flex-1">
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center space-y-4 mb-16">
            <h1 className="font-display text-4xl lg:text-5xl font-bold">
              {t("posts.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("posts.description")}
            </p>
          </div>

          <div className="space-y-6">
            {publishedPosts.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <article
                  className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
                  data-testid={`card-post-${post.id}`}
                >
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <time>
                      {format(new Date(post.createdAt), "MMMM d, yyyy")}
                    </time>
                  </div>
                  <h2 className="font-display text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    {t("posts.readMore")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}

            {publishedPosts.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p>{t("posts.noPosts")}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
