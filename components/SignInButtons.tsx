import { signIn } from "next-auth/react";

const SignInButtons = ({ className = "" }) => {
  const handleLoginClick = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => handleLoginClick("google")}
        className="px-10 h-fit py-2 bg-white text-black rounded-lg shadow-md border border-gray-300 hover:bg-gray-100"
      >
        <div className="flex justify-center items-center gap-2.5">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#EA4335"
              d="M5.27 9.76A7.08 7.08 0 0 1 16.42 6.5L19.9 3A11.97 11.97 0 0 0 1.24 6.65l4.03 3.11Z"
            />
            <path
              fill="#34A853"
              d="M16.04 18.01A7.4 7.4 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.82l-4.04 3.06A11.96 11.96 0 0 0 12 24a11.4 11.4 0 0 0 7.83-3l-3.79-2.99Z"
            />
            <path
              fill="#4A90E2"
              d="M19.83 21c2.2-2.05 3.62-5.1 3.62-9 0-.7-.1-1.47-.27-2.18H12v4.63h6.44a5.4 5.4 0 0 1-2.4 3.56l3.8 2.99Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27a7.12 7.12 0 0 1-.01-4.5L1.24 6.64A11.93 11.93 0 0 0 0 12c0 1.92.44 3.73 1.24 5.33l4.04-3.06Z"
            />
          </svg>
          <span className="text-nowrap text-zinc-800">Google</span>
        </div>
      </button>
      <button
        onClick={() => handleLoginClick("google")}
        className="px-10 h-fit py-2 bg-white text-black rounded-lg shadow-md border border-gray-300 hover:bg-gray-100"
      >
        <div className="flex justify-center items-center gap-2.5">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
          </svg>
          <span className="text-nowrap text-zinc-800">Github</span>
        </div>
      </button>
    </div>
  );
};

export default SignInButtons;
