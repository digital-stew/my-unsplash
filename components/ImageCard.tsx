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
  let showModal = false;
  function deleteCard() {}
  return (
    <>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={"/uploaded/" + uuid}
          alt={label}
          sizes="200px"
        />
        <p>{label}</p>
        {<DeletePhoto id={id} />}
      </div>
    </>
  );
}

export default ImageCard;
