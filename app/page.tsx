"use client";
import React, { useState, useEffect } from "react";
import { dbImageType } from "../pages/api/images";
import styles from "./page.module.css";
import ImageCard from "../components/ImageCard";
function Page() {
  const [images, setImages] = useState<dbImageType[]>([]);

  useEffect(() => {
    async function getImages() {
      const res = await fetch("/api/images/");
      if (res.status === 200) {
        const data: dbImageType[] = await res.json();
        setImages([...data]);
      }
    }
    getImages();
    return () => {};
  }, []);

  return (
    <div className={styles.imageGrid}>
      {images.length > 0 &&
        images.map((image, index) => {
          return (
            <div key={image.id} className={styles.imageWrap}>
              <ImageCard id={image.id} label={image.label} uuid={image.uuid} />
            </div>
          );
        })}
    </div>
  );
}

export default Page;
