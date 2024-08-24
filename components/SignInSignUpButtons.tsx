import { SignInButton, SignUpButton } from "@clerk/nextjs";

const SignInSignUpButtons = ({ className = "" }) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      <SignInButton mode="redirect">
        <button className="px-4 py-2 bg-white text-black rounded-full shadow-md border border-gray-300 hover:bg-gray-100">
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="redirect">
        <button className="px-4 py-2 bg-gray-200 text-gray-500 rounded-full shadow-md border border-gray-300 hover:bg-gray-300">
          Sign Up
        </button>
      </SignUpButton>
    </div>
  );
};

export default SignInSignUpButtons;
