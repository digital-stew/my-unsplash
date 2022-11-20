"use client";
import "./global.css";
import Link from "next/link";
import { useState } from "react";
import search from "../components/search.svg";
// import styles from "./layout.module.css";
import Header from "./header";
export default function RootLayout({
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