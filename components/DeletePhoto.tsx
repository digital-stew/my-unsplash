"use client";
import React, { useState } from "react";
import styles from "../styles/modal.module.css";

function DeletePhoto({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  async function handleDeleteCard(e: React.FormEvent, id: number) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/search/delete", {
      cache: "no-cache",
      method: "DELETE",
      body: JSON.stringify({ id, password }),
    });
    if (res.status === 200) {
      alert(id + " deleted");
      // const data = res.json()
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
