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
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <SignedOut>
            <SignIn path="/login" routing="path" signUpUrl="/sign-up" />
          </SignedOut>
          <div className="flex flex-col items-center space-y-4">
            <p>You are already signed in.</p>
            <UserButton />
            <SignOutButton>
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}
