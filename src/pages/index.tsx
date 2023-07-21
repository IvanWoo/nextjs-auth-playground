import { Inter } from "next/font/google";
import Profile from "../components/profile";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
      <Profile />
    </main>
  );
}
