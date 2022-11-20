import React, { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";
import styles from "./layout.module.css";
import logo from "../components/my_unsplash_logo.svg";
import search from "../components/search.svg";
import UploadPhoto from "../components/UploadPhoto";
function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleClick(e: any) {
      if (e.target.className.includes("modalOuter")) setModalOpen(false);
    }
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Image src={logo} alt="logo" width={200} height={150} />
        <div
          className={styles.inputWrap}
          onClick={(e) => {
            null;
          }}
        >
          <input type="text" placeholder="Search by name" />
          <Image
            className={styles.searchBtn}
            src={search}
            alt="search"
            width={50}
            height={50}
          />
        </div>

        <button onClick={() => setModalOpen(true)}>Add a photo</button>
      </header>
      {modalOpen && <UploadPhoto setModalOpen={setModalOpen} />}
    </>
  );
}

export default Header;
