import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
// Asegúrate de importar tu función isSignedIn

const getAuth = auth();

export default async function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const signedIn = getAuth.userId ? true : false;

    if (!signedIn) {
        redirect("/sign-in");
    }

    return <>{children}</>;
}
