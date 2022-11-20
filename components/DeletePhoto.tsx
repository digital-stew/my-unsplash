import React from "react";
import styles from "../styles/deleteCard.modal.module.css";
// import styles from "../styles/uploadPhoto.modal.module.css";

function DeletePhoto({ setShowModal }) {
  return (
    <div className={styles.modalOuter}>
      <div className={styles.modal}>
        <form action="">
          <h3>Are you sure?</h3>
          <label>
            password
            <input type="password" />
            <div className={styles.buttonsWrap}>
              <button>submit</button>
              <button>submit</button>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
}

export default DeletePhoto;
