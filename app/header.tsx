"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./layout.module.css";
import logo from "../components/my_unsplash_logo.svg";
import searchIcon from "../components/search.svg";
import UploadPhoto from "../components/UploadPhoto";

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  function getSearch(e?: React.FormEvent) {
    e?.preventDefault();
    router.push("/" + search);
  }

  return (
    <>
      <header className={styles.header}>
        <Image src={logo} alt="logo" width={200} height={150} />
        <div className={styles.inputWrap}>
          <form onSubmit={(e) => getSearch(e)}>
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Image
              className={styles.searchBtn}
              src={searchIcon}
              alt="search"
              width={50}
              height={50}
              onClick={() => getSearch()}
            />
          </form>
        </div>

        <button
          style={{ marginLeft: "auto" }}
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
