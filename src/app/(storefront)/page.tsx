import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function StorefrontHomePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Storefront Home</h1>
      {session?.user ? (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-zinc-500 font-mono text-sm">Welcome, {session.user.name}</p>
          <p className="text-zinc-500 font-mono text-xs">{session.user.email}</p>
          <Link href="/dashboard/overview">
            <Button className="mt-4" variant="outline">Dashboard</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-zinc-500 font-mono text-sm">Not authenticated (Placeholder)</p>
          <div className="flex gap-4 mt-4">
            <Link href="/signin">
              <Button>Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
