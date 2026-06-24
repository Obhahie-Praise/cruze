"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldContent, FieldSet } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, ViewIcon, ViewOffIcon } from "hugeicons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recovery Dialog states
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [isRecoveryLoading, setIsRecoveryLoading] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const isRecoveryOpen = searchParams.get("recovery") === "true";

  const openRecovery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("recovery", "true");
    router.push(`${pathname}?${params.toString()}`);
  };

  const closeRecovery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("recovery");
    router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname);
    // Reset states
    setRecoveryEmail("");
    setRecoveryError(null);
    setRecoverySuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signIn.email({
        email,
        password,
        rememberMe,
        fetchOptions: {
          onSuccess(ctx) {
            const role = ctx.data?.user?.role;
            if (role === "ADMIN") {
              router.push("/dashboard/overview");
            } else {
              router.push("/");
            }
          },
          onError(ctx) {
            setError(ctx.error.message || "Invalid email or password.");
          },
        },
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred with Google authentication.");
      setIsGoogleLoading(false);
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail) {
      setRecoveryError("Please enter your email address.");
      return;
    }

    setIsRecoveryLoading(true);
    setRecoveryError(null);

    try {
      const res = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: recoveryEmail,
          redirectTo: `${window.location.origin}/reset-password`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          (data as { message?: string }).message ??
          "Failed to send recovery email. Please try again.";
        setRecoveryError(message);
      } else {
        setRecoverySuccess(true);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setRecoveryError(message);
    } finally {
      setIsRecoveryLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign in!
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          className="w-full h-11 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50 border-0 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          onClick={handleGoogleSignIn}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <GoogleIcon className="mr-2 h-5 w-5" />
          )}
          Sign in with Google
        </Button>
      </div>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FieldSet>
          <Field>
            <FieldLabel htmlFor="email">Email *</FieldLabel>
            <FieldContent>
              <Input
                id="email"
                type="email"
                placeholder="info@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password *</FieldLabel>
            <FieldContent className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <ViewOffIcon size={20} />
                ) : (
                  <ViewIcon size={20} />
                )}
              </button>
            </FieldContent>
          </Field>
        </FieldSet>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
            >
              Keep me logged in
            </label>
          </div>
          <button
            type="button"
            onClick={openRecovery}
            className="text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          className="mt-4 h-11 w-full bg-white text-zinc-950 hover:bg-zinc-100 border border-zinc-200 shadow-sm dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading ? (
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-900" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="text-left text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign Up
        </Link>
      </div>

      {/* Forgot Password Recovery Dialog */}
      <Dialog open={isRecoveryOpen} onOpenChange={(open) => {
        if (!open) closeRecovery();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              {recoverySuccess
                ? "Check your email inbox for a link to reset your password."
                : "Enter your email address and we'll send you a recovery link."}
            </DialogDescription>
          </DialogHeader>

          {recoveryError && (
            <Alert variant="destructive" className="my-2">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{recoveryError}</AlertDescription>
            </Alert>
          )}

          {recoverySuccess ? (
            <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Recovery Email Sent</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  We have sent a secure password reset link to <strong>{recoveryEmail}</strong>.
                </p>
                <div className="text-xs text-muted-foreground bg-muted p-2 rounded mt-2 max-w-xs mx-auto">
                  If the email does not arrive in a few minutes, check your spam/junk folder.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRecoverySubmit} className="space-y-4 py-2">
              <Field>
                <FieldLabel htmlFor="recoveryEmail">Email Address</FieldLabel>
                <FieldContent>
                  <Input
                    id="recoveryEmail"
                    type="email"
                    placeholder="name@example.com"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    required
                    disabled={isRecoveryLoading}
                    className="h-11"
                  />
                </FieldContent>
              </Field>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeRecovery}
                  disabled={isRecoveryLoading}
                  className="h-11"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isRecoveryLoading}
                  className="h-11 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {isRecoveryLoading ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    "Send Recovery Link"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
