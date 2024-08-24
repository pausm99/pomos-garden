import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import CustomSignInButton from "./CustomSignInButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-14">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/pomosgarden-logo.png"
          alt="Pomo's Garden logo"
          width={62}
          height={62}
        />
        <span className="mt-1.5 font-medium leading-4 text-zinc-900">
          Pomo's
          <br />
          Garden
        </span>
      </Link>
      <div>
        <SignedOut>
          <CustomSignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton />
        </SignedIn>
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://picsum.photos/200" />
          <AvatarFallback>PG</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
