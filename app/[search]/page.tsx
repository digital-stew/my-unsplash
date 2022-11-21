import React from "react";
import { dbImageType } from "../../pages/api/images";
import styles from "../page.module.css";
import ImageCard from "../../components/ImageCard";

async function getData(search: string) {
  const res = await fetch(
    process.env.SERVER_ADDRESS + "/api/search/" + search,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
}

async function Page({ params }) {
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
