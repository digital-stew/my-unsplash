import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/imageCard.module.css";
import DeletePhoto from "./DeletePhoto";
import { dbImageType } from "../pages/api/images";
import { resolveObjectURL } from "buffer";

async function ImageCard({ uuid, label, id }: Partial<dbImageType>) {
  return (
    <>
      <div className={styles.imageWrap}>
        <img
          id={id?.toString()}
          className={styles.image}
          src={"https://tux-systems.co.uk/uploads/" + uuid}
          style={{ objectFit: "cover" }}
          alt={label ? label : "undefined"}
        />
        <p>{label}</p>
        {<DeletePhoto id={id} />}
      </div>
    </>
  );
}

export default ImageCard;
