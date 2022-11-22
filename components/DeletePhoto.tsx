"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../styles/modal.module.css";

function DeletePhoto({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function handleDeleteCard(e: React.FormEvent, id: number) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/search/delete", {
      cache: "no-cache",
      method: "DELETE",
      body: JSON.stringify({ id, password }),
    });
    if (res.status === 200) {
      setShowModal(false);
      document.getElementById(id.toString()).classList.add("spinOff");
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
              handleDeleteCard(e, id);
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
}

export default DeletePhoto;
