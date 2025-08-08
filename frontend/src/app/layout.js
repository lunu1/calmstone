import { Cormorant_Garamond, 
   Share_Tech_Mono
 } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../../components/LayoutWrapper";
import SmallFooter from "../../components/Footer";



const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"], // choose weights you need
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-sharetech",
  weight: "400", // only one weight available
  display: "swap",
});

export const metadata = {
  title: "CSGC – Calm Stone General Contracting",
  description: "Calm Stone General Contracting delivers quality residential and commercial construction services.",
  icons: {
    icon: "/logo.png",           // main icon
    shortcut: "/logo.png",       // shortcut icon
    apple: "/logo.png",         // iOS homescreen
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cormorant.variable}>
  <body className="font-primary antialiased">
     <LayoutWrapper>{children}</LayoutWrapper>
     <SmallFooter/>
  </body>
  
</html>

  );
}
