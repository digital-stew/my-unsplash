import React from "react";
import { dbImageType } from "../../pages/api/images";
import styles from "../page.module.css";
import ImageCard from "../../components/ImageCard";

async function getData(search: string) {
  const res = await fetch("http://127.0.0.1:10006/api/images/", {
    method: "GET",
    cache: "no-store",
    headers: { search: search },
  });
  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}

async function Page({ params }: { params: { search: string } }) {
  const images: dbImageType[] = await getData(params.search);
  return (
    <div className={styles.imageGrid}>
      {images.length > 0 &&
        images.map((image) => {
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
