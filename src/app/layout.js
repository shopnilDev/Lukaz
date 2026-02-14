// app/layout.tsx
import "./globals.css";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SecondMenu from "@/components/Header/SecondMenu";
import Provider from "@/layout/Provider";
import { getCategories, getMenus, getNotices } from "@/utils/actions";
import MessengerButton from "@/components/shared/MessengerButton";

// Import DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Import Space Grotesk
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "Lukaz Belive in Quality",
  description: "E-commerce Platform",
};

export default async function RootLayout({ children }) {
  const categories = await getCategories();
  const mainMenus = await getMenus();
  const notices = await getNotices();

  return (
    <html className={`${dmSans.variable} ${spaceGrotesk.variable}`} lang="en">
      <body>
        <Provider>
          <Header mainMenus={mainMenus} categories={categories} notices={notices} />
          <SecondMenu />
          {children}
          <Footer />
        </Provider>
        <Toaster position="top-right" />
        <MessengerButton />
      </body>
    </html>
  );
}
