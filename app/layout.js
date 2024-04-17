import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div lang="fr">
      <div className={inter.className}>{children}</div>
    </div>
  );
}
