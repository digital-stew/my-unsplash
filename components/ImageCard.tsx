import React, { useState } from "react";
import Image from "next/image";
// import styles from "../styles/imageCard.module.css";
import DeletePhoto from "./DeletePhoto";
import { dbImageType } from "../pages/api/images";

function ImageCard({ uuid, label, id }: Partial<dbImageType>) {
  return (
    <>
      <div className="relative h-full w-full flex ">
        <img
          id={id?.toString()}
          className=" rounded-md h-full w-full absolute object-cover"
          src={"https://tux-systems.co.uk/uploads/" + uuid}
          // style={{ objectFit: "cover" }}
          alt={label ? label : "undefined"}
        />
        <p className="absolute text-white text-shadow bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          {label}
        </p>
        {<DeletePhoto id={id} />}
      </div>
    </>
  );
}

export default ImageCard;
