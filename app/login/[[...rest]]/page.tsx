import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function LoginPage() {
  return (
    <ClerkProvider>
      <div className="flex items-center justify-center min-h-screen bg-zinc-100">
        <SignedOut>
          <SignIn path="/login" routing="path" signUpUrl="/sign-up" />
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}
