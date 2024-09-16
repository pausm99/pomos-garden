import { signIn } from "next-auth/react";

const SignInSignUpButtons = ({ className = "" }) => {
  const handleLoginClick = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className={`flex space-x-4 ${className}`}>
      <button
        onClick={() => handleLoginClick("google")}
        className="px-4 py-2 bg-white text-black rounded-full shadow-md border border-gray-300 hover:bg-gray-100"
      >
        Log in with Google
      </button>
      <button
        onClick={() => handleLoginClick("github")}
        className="px-4 py-2 bg-white text-black rounded-full shadow-md border border-gray-300 hover:bg-gray-100"
      >
        Log in with GitHub
      </button>
    </div>
  );
};

export default SignInSignUpButtons;
