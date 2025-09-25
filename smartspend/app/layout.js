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
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${libreBaskerville.className} `}>
          {/* header */}
          <Header/>
          <main className="min-h-screen">
          {children}
          </main>
          <Toaster richColors />
          {/* footer */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>
                Made with 💝 by Aakash
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
