import SignInSignUpButtons from "@/components/SignInSignUpButtons";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative">
        <SignInSignUpButtons className="absolute left-1/2 transform -translate-x-1/2 -top-12" />
        <SignIn
          appearance={{
            layout: {
              logoImageUrl: "/assets/images/pomosgarden-logo.png",
              logoPlacement: "inside",
            },
            elements: {
              card: "p-4 shadow-lg rounded-lg", // Optional: Style the card
            },
          }}
        />
      </div>
    </div>
  );
}
