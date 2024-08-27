import { SignInButton } from "@clerk/nextjs";

const CustomSignInButton = () => {
  return (
    <SignInButton mode="redirect">
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign In
      </button>
    </SignInButton>
  );
};

export default CustomSignInButton;
