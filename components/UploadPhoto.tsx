"use client";
// import styles from "../styles/uploadPhoto.modal.module.css";
import styles from "../styles/modal.module.css";
import React, { useRef, useState } from "react";
import Image from "next/image";

interface ImageType {
  image: string;
  setImage: React.SetStateAction<ImageType>;
}
function UploadPhoto({ setModalOpen }) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");

  const [image, setImage] = useState(null);
  const [label, setLabel] = useState("");
  const [uploadURL, setUploadURL] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  function dropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length > 1) {
      return showMsg("1 picture at a time please");
    }
    setImage(e.dataTransfer.files[0]);
  }

  async function getURL(): Promise<boolean> {
    const res = fetch(uploadURL);

    return true;
  }

  function shakeInput(input: string) {
    document.getElementById(input).classList.add("shake");
    setTimeout(() => {
      document.getElementById(input).classList.remove("shake");
    }, 2000);
  }

  function showMsg(msg: string) {
    setMsg(msg);
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }

  async function submitStep1(e: React.FormEvent) {
    e.preventDefault();
    let error = false;
    if (label.length === 0) {
      error = true;
      shakeInput("label");
    }

    if (uploadURL.length === 0 && !image) {
      error = true;
      shakeInput("photoURL");
    }

    if (uploadURL.length > 0) {
      try {
        const res = await fetch(uploadURL, {
          cache: "no-store",
        });

        if (res.headers.get("content-type").includes("image")) {
          const data = await res.blob();
          setImage(data);
        }
      } catch (err) {
        error = true;
        shakeInput("photoURL");
      }
    }

    if (!error) setStep(2);
  }

  function submitStep2(e: React.FormEvent) {
    e.preventDefault();
    if (password1.length < 4) {
      showMsg("password too short");
      shakeInput("password1");
      return;
    } else {
      setStep(3);
    }
  }

  function submitStep3(e: React.FormEvent) {
    e.preventDefault();
    if (password1 === password2) {
      upload();
    } else {
      showMsg("passwords don't match");
      shakeInput("password2");
    }
  }
  async function upload() {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("password", password1);
    formData.append("label", label);

    const res = await fetch("/api/images", {
      method: "POST",
      cache: "no-cache",
      body: formData,
    });
    console.log(res.status);
    if (res.status === 200) {
      const uuid = await res.json();
      console.log(uuid);
      // setDownloadLink(window.location.origin + "/api/image/" + uuid);

      // setLoading(false);
      // setFinished(true)
      setModalOpen(false);
    } else {
      const data = await res.json();
      showMsg(data.error);
      setImage("");
      setStep(1);
    }
    setLoading(false);
  }

  if (step === 1 && !loading)
    return (
      <div className={styles.modalOuter} onClick={() => setModalOpen(false)}>
        <div
          className={styles.modal}
          onDrop={(e) => {
            dropHandler(e);
          }}
          onDragOver={(e) => {
            handleDragOver(e);
          }}
        >
          <form onSubmit={(e) => submitStep1(e)}>
            <h3>Add a new photo</h3>
            <label>
              Label
              <input
                id="label"
                type="text"
                placeholder="Add a label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </label>
            <label>
              Photo URL
              <input
                id="photoURL"
                type="text"
                placeholder="https://link-to-my-image.com"
                value={uploadURL}
                onChange={(e) => {
                  setUploadURL(e.target.value);
                  setImage("");
                }}
              />
            </label>
            <p>or</p>
            <input
              id="fileInput"
              type="file"
              className={styles.fileInput}
              onChange={(e) => {
                setImage(e.target.files[0]);
                setUploadURL("");
              }}
              style={{ display: "none" }}
            />
            <div className={styles.buttonsWrap}>
              <span>
                <button
                  type="button"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Choose file
                </button>
                or drop here
              </span>
              <button
                style={{ marginLeft: "auto" }}
                type="reset"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit">Submit</button>
            </div>

            <p>{msg}</p>
            {image && <p>{image.name}</p>}

            {image && (
              <Image
                src={URL.createObjectURL(image)}
                alt="drop image"
                sizes="200px"
                height={300}
                width={500}
                style={{ objectFit: "contain" }}
              />
            )}
          </form>
        </div>
      </div>
    );

  if (step === 2 && !loading)
    return (
      <div className={styles.modalOuter}>
        <div className={styles.modal}>
          <form onSubmit={(e) => submitStep2(e)}>
            <label>
              choose a password
              <input
                id="password1"
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </label>
            <div className={styles.buttonsWrap}>
              <button type="button" onClick={(e) => submitStep2(e)}>
                Submit
              </button>
              <button type="reset" onClick={() => setStep(1)}>
                Back
              </button>
            </div>
          </form>
          <p>{msg}</p>
        </div>
      </div>
    );

  if (step === 3 && !loading)
    return (
      <div className={styles.modalOuter}>
        <div className={styles.modal}>
          <form onSubmit={(e) => submitStep3(e)}>
            <label>
              Again
              <input
                id="password2"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </label>

            <div className={styles.buttonsWrap}>
              <button type="button" onClick={(e) => submitStep3(e)}>
                Submit
              </button>
              <button type="reset" onClick={() => setStep(1)}>
                Back
              </button>
            </div>
          </form>
          <p>{msg}</p>
        </div>
      </div>
    );

  if (loading) {
    return (
      <div className={styles.modalOuter}>
        <div className={styles.modal}>
          {/* <div className={styles.wrapper}> */}
          <h2>Uploading...</h2>
          <div className={styles.progressBar}></div>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default UploadPhoto;
