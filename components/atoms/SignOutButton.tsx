import { ClerkProvider, SignOutButton } from "@clerk/nextjs";
import React from "react";

const SignOutComponent = () => {
  return (
    <ClerkProvider>
      <SignOutButton>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Sign Out
        </button>
      </SignOutButton>
    </ClerkProvider>
  );
};

export default SignOutComponent;
