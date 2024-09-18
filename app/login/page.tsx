"use client";

import SignInButtons from "@/components/SignInButtons";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center space-y-6 shadow-2xl p-10 bg-zinc-100 rounded-3xl border">
        <Image
          alt="Pomo's Garden logo"
          src="/assets/images/pomosgarden-logo.png"
          width={62}
          height={62}
        />
        <h1 className="text-3xl">Sign in to Pomo&apos;s Garden</h1>
        <SignInButtons />
        <span className="text-zinc-800 text-lg">Grow your productivity</span>
      </div>
    </div>
  );
}
