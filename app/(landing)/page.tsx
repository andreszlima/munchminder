import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <SignedIn>
        <p>You are signed in!</p>
      </SignedIn>
      <SignedOut>
        <p>You are signed out!</p>
        <Link href="/sign-in">Login</Link>
      </SignedOut>
      <UserButton />
    </div>
  );
}
