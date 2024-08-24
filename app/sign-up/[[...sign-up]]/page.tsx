import SignInSignUpButtons from "@/components/SignInSignUpButtons";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative">
        {/* Center the buttons above the SignIn component */}
        <SignInSignUpButtons className="absolute left-1/2 transform -translate-x-1/2 -top-12" />
        <SignUp
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
