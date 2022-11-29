"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import styles from "./layout.module.css";
import logo from "../components/my_unsplash_logo.svg";
import searchIcon from "../components/search.svg";
import UploadPhoto from "../components/UploadPhoto";
import Link from "next/link";

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();

  function getSearch(e?: React.FormEvent) {
    e?.preventDefault();
    router.push("/my-unsplash/" + search);
  }

  function openNav() {
    setNavOpen(!navOpen);
    const headerElement = document.querySelector("header") as HTMLElement;
    if (!navOpen) {
      headerElement.style.height = "400px";
    } else {
      headerElement.style.height = "130px";
    }
  }

  return (
    <>
      <header className="flex justify-around items-center h-16">
        <div>
          <button className="md:hidden" onClick={() => openNav()}>
            <svg
              data-expanded={navOpen ? "true" : "false"}
              stroke="black"
              fill="none"
              viewBox="-10 -10 120 120"
              width="50"
            >
              <path
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
              ></path>
            </svg>
          </button>
          <Link href={"/"} className="">
            <Image src={logo} alt="logo" width={200} height={150} />
          </Link>
        </div>
        <div className="relative">
          <form onSubmit={(e) => getSearch(e)}>
            <input
              className=" border-slate-600 h-12 pl-14 border-spacing-20 border shadow-lg rounded-lg"
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Image
              className=" absolute top-0"
              src={searchIcon}
              alt="search"
              width={50}
              height={50}
              onClick={() => getSearch()}
            />
          </form>
        </div>
        <button
          className=" btn-primary"
          id="headerButton"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          Add a photo
        </button>
      </header>
      {modalOpen && <UploadPhoto setModalOpen={setModalOpen} />}
    </>
  );
}

export default Header;
