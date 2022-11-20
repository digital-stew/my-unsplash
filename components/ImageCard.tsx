"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/imageCard.module.css";
import DeletePhoto from "./DeletePhoto";
import { dbImageType } from "../pages/api/images";
function ImageCard({
  uuid,
  label,
  fileName,
  id,
  password,
}: Partial<dbImageType>) {
  const [showModal, setShowModal] = useState(false);
  function deleteCard() {}
  return (
    <>
      <div className={styles.imageWrap}>
        <button onClick={() => setShowModal(true)}>Delete</button>
        <img
          className={styles.image}
          src={"/uploaded/" + uuid}
          alt={label}
          sizes="200px"
        />
        <p>{label}</p>
      </div>
      {showModal && <DeletePhoto setShowModal={setShowModal} />}
    </>
  );
}

export default ImageCard;
