"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../styles/modal.module.css";
import { dbImageType } from "../pages/api/images";

function DeletePhoto({ id }: Partial<dbImageType>) {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleDeleteCard(e: React.FormEvent, id: number) {
    e.preventDefault();
    const uploadForm = new FormData();
    uploadForm.append("id", id.toString());
    uploadForm.append("password", password);
    const res = await fetch("/my-unsplash/api/images", {
      cache: "no-cache",
      method: "DELETE",
      // body: JSON.stringify({ id, password }),
      body: uploadForm,
    });
    if (res.status === 200) {
      setShowModal(false);
      const element = document.getElementById(id.toString());
      element?.classList.add("spinOff");
      setTimeout(() => {
        router.refresh();
      }, 1000);
      // router.refresh();
      // alert(id + " deleted");
    } else if (res.status === 401) {
      alert("wrong password");
    } else {
      alert("something went wrong");
    }
  }
  if (!showModal)
    return (
      <button style={{ zIndex: "100" }} onClick={() => setShowModal(true)}>
        delete
      </button>
    );
  if (showModal)
    return (
      <div className={styles.modalOuter}>
        <div className={styles.modal + " grow"}>
          <form
            onSubmit={(e) => {
              if (id) handleDeleteCard(e, id);
            }}
          >
            <h3>Are you sure?</h3>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <div className={styles.buttonsWrap}>
                <button type="reset" onClick={() => setShowModal(false)}>
                  cancel
                </button>
                <button type="submit">submit</button>
              </div>
            </label>
          </form>
        </div>
      </div>
    );
  return null;
}

export default DeletePhoto;
