"use client";
import React from "react";
import Image from "next/image";
import styles from "../styles/imageCard.module.css";
import { dbImageType } from "../pages/api/images";
function ImageCard({ uuid, label }: Partial<dbImageType>) {
  return (
    <>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={"/uploaded/" + uuid}
          alt="drop image"
          sizes="200px"
        />
      </div>
    </>
  );
}

export default ImageCard;
