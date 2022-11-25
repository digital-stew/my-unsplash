import { dbImageType } from "../pages/api/images";
import styles from "./page.module.css";
import ImageCard from "../components/ImageCard";

async function getData() {
  const res = await fetch("http://127.0.0.1:10006/api/images/", {
    cache: "no-store",
  });
  return await res.json();
}

async function Page() {
  const images: dbImageType[] = await getData();

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
