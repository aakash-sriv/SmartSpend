import Header from "@/components/header";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],        // choose character subsets
  weight: ["400", "700"],    // choose which font weights you need
  display: "swap",           // optional: for better font loading
});
export const metadata = {
  title: "SmartSpend",
  description: "Where finance meets management",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          // Modal/Card background
          modalContent: "bg-[#ECF4E8]",
          card: "bg-[#ECF4E8]",
          // Header
          headerTitle: "text-[#439A86]",
          headerSubtitle: "text-[#439A86]",
          // Form elements
          formButtonPrimary: "bg-gradient-to-br from-[#93BFC7] to-[#ABE7B2] hover:opacity-90",
          formFieldInput: "border-[#CBF3BB] focus:border-[#93BFC7]",
          // Footer
          footerActionLink: "text-[#93BFC7] hover:text-[#ABE7B2]",
          // Social buttons
          socialButtonsBlockButton: "border-[#CBF3BB] hover:bg-[#CBF3BB]/20",
        },
      }}
    >
      <html lang="en">
        <body className={`${libreBaskerville.className} `}>
          {/* header */}
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster richColors />
          {/* footer */}
          <footer className="bg-blue-50 py-8 text-lg">
            <div className="container mx-auto px-4 text-left text-foreground">
              <p>
                © 2025 SmartSpend by Aakash.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
