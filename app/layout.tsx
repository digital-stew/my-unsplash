import "./global.css";
import Link from "next/link";
import Header from "./header";
import { dbImageType } from "../pages/api/images";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Header />

        {children}
        <footer>
          created by
          <Link href="https://tux-systems.co.uk">Stewart Ridings</Link>
          {"  -  "}
          <Link href="https://devchallenges.io/portfolio/digital-stew">
            devChallenges.io
          </Link>
        </footer>
      </body>
    </html>
  );
}
