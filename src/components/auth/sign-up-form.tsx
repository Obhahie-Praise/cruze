"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldContent, FieldError, FieldSet } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, ViewIcon, ViewOffIcon } from "hugeicons-react";

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export function SignUpForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill out all required fields.");
      return;
    }
    if (!termsAgreed) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`,
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
            setError(ctx.error.message || "An error occurred during sign up.");
          },
        },
      });
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: any) {
      setError(err?.message || "An error occurred with Google authentication.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign up!
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
          onClick={handleGoogleSignUp}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <GoogleIcon className="mr-2 h-5 w-5" />
          )}
          Sign up with Google
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
        <FieldSet className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="firstName">First Name *</FieldLabel>
            <FieldContent>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="h-11"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="lastName">Last Name *</FieldLabel>
            <FieldContent>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="h-11"
              />
            </FieldContent>
          </Field>
        </FieldSet>

        <FieldSet>
          <Field>
            <FieldLabel htmlFor="email">Email *</FieldLabel>
            <FieldContent>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
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

        <div className="flex items-start gap-2 mt-2">
          <Checkbox
            id="terms"
            checked={termsAgreed}
            onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
            className="mt-1"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
          >
            By creating an account means you agree to the{" "}
            <Link href="/terms" className="text-foreground hover:underline">Terms and Conditions</Link>, and our{" "}
            <Link href="/privacy" className="text-foreground hover:underline">Privacy Policy</Link>
          </label>
        </div>

        <Button
          type="submit"
          className="mt-4 h-11 w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading ? (
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      <div className="text-left text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
