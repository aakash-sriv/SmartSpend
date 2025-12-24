import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
import { currentUser } from "@clerk/nextjs/server";

const Header = async () => {
  await checkUser();
  const user = await currentUser();
  const isDemoUser = user?.emailAddresses?.[0]?.emailAddress === "dehet67222@nyfhk.com";

  return <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/">
        <Image
          src={"/logo1.png"}
          alt="SmartSpend"
          height={60}
          width={200}
          className="h-20 w-20 object-contain"
        />
      </Link>

      <div className="flex items-center space-x-4">
        <SignedIn>
          <Link href={"/dashboard"} className="bg-gradient-to-br from-[#93BFC7] to-[#ABE7B2] rounded-md text-white flex items-center gap-2 cursor-pointer">
            <Button variant="outline " className="text-white hover:text-gray-100 border-none">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>

          <Link href={"/transaction/create"}>
            <Button className="flex items-center gap-2 bg-gradient-to-br from-[#93BFC7] to-[#ABE7B2] text-white">
              <PenBox size={18} alt={"transaction"} />
              <span className="hidden md:inline cursor-pointer ">Add Transaction</span>
            </Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline">Login</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-2">
            {isDemoUser && (
              <span className="text-sm font-medium text-gray-500 border border-gray-200 px-3 py-1 rounded-full bg-gray-50">
                Logged in as Guest
              </span>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
              userProfileMode={isDemoUser ? "navigation" : "modal"}
              userProfileProps={{
                appearance: {
                  elements: {
                    // Hide profile editing sections for demo user
                    profileSection__danger: isDemoUser ? "hidden" : "",
                    profileSection__emailAddresses: isDemoUser ? "hidden" : "",
                    profileSection__username: isDemoUser ? "hidden" : "",
                    profileSection__password: isDemoUser ? "hidden" : "",
                  },
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </nav>
  </div>
};

export default Header