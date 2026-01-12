import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { Lock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import logoUrl from "@assets/logo.png";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/hooks/useAuth";

export default function AdminLogin() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          toast({
            title: t("admin.login.messages.welcomeBack"),
            description: t("admin.login.messages.loggedInAsAdmin"),
          });
        },
        onError: () => {
          toast({
            title: t("admin.login.messages.invalidCredentials"),
            description: t("admin.login.messages.checkCredentials"),
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("admin.login.backToHome")}
        </Link>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
          <div className="text-center space-y-4 mb-8">
            <img
              src={logoUrl}
              alt="Fortuna.ai"
              className="h-8 w-auto mx-auto invert"
            />
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-secondary" />
            </div>
            <h1 className="font-display text-2xl font-semibold">
              {t("admin.login.title")}
            </h1>
            <p className="text-muted-foreground text-sm">
              {t("admin.login.description")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                {t("admin.login.labels.username")}
              </Label>
              <Input
                id="username"
                type="text"
                placeholder={t("admin.login.placeholders.username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 px-4 rounded-xl"
                data-testid="input-username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                {t("admin.login.labels.password")}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t("admin.login.placeholders.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 px-4 rounded-xl"
                data-testid="input-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-semibold text-base"
              data-testid="button-login"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending
                ? t("common.loading", { defaultValue: "Loading..." })
                : t("admin.login.signIn")}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {t("admin.login.restricted")}
        </p>
      </div>
    </div>
  );
}
