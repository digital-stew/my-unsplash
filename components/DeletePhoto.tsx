"use client";
import React, { useState } from "react";
import styles from "../styles/modal.module.css";

function DeletePhoto({ id }) {
  const [showModal, setShowModal] = useState(false);
  if (!showModal)
    return (
      <button style={{ zIndex: "100" }} onClick={() => setShowModal(true)}>
        delete
      </button>
    );
  if (showModal)
    return (
      <div className={styles.modalOuter} onClick={() => setShowModal(false)}>
        <div className={styles.modal}>
          <form action="">
            <h3>Are you sure?</h3>
            <label>
              password
              <input type="password" />
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
