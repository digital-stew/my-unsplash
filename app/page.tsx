import { dbImageType } from "../pages/api/images";
// import styles from "./page.module.css";
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
    <div className="container grid grid-cols-[repeat(3,1fr)] relative object-contain grid-flow-row-dense mx-auto gap-3 auto-rows-[minmax(100px,300px)]">
      {images.length > 0 &&
        images.map((image, index) => {
          const styles = [];
          if (index > 0 && index % 3 === 0) styles.push("col-span-2");
          if ((index > 6 && index % 3 === 0) || index === 1)
            styles.push("row-span-2");

          return (
            <div
              key={image.id}
              className={
                "group hover:scale-110 transition-all hover:z-20 " +
                styles.join(" ")
              }
            >
              <ImageCard id={image.id} label={image.label} uuid={image.uuid} />
            </div>
          );
        })}
    </div>
  );
}

export default Page;
