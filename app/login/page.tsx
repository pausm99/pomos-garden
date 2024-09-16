"use client";

import SignInSignUpButtons from "@/components/SignInSignUpButtons";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative">
        <SignInSignUpButtons className="absolute left-1/2 transform -translate-x-1/2 -top-12" />
      </div>
    </div>
  );
}
