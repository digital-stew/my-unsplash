import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/imageCard.module.css";
import DeletePhoto from "./DeletePhoto";
import { dbImageType } from "../pages/api/images";
function ImageCard({ uuid, label, id }: Partial<dbImageType>) {
  return (
    <>
      <div className={styles.imageWrap}>
        <Image
          id={id?.toString()}
          className={styles.image}
          src={"/uploaded/" + uuid}
          style={{ objectFit: "cover" }}
          fill
          alt={label ? label : "undefined"}
        />
        <p>{label}</p>
        {<DeletePhoto id={id} />}
      </div>
    </>
  );
}

export default ImageCard;
