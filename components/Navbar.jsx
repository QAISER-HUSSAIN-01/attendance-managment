import React from 'react';
import styles from '../styles/Navbar.module.css';
import {MdDownload} from 'react-icons/md'
function Navbar() {
  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <span className={styles.first__alphabet}>A</span>
            <div className={styles.logo__text}>
                <span>ttendance</span>
                <span>Sheet</span>
            </div>
        </div>
        <div className="menu">
            <span className={styles.icon}>
                <MdDownload />
            </span>
        </div>
    </div>
  )
}

export default Navbar;