import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { MdDownload } from 'react-icons/md';
import UserForm from './UserForm';


function Navbar() {
    const [top,setTop] = useState('-500px');
    const handleUserForm = () => { 
        setTop('80px')
     }
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <span className={styles.first__alphabet}>A</span>
                <div className={styles.logo__text}>
                    <span>ttendance</span>
                    <span>Sheet</span>
                </div>
            </div>
            <div className={styles.menu}>
                <MdDownload className={styles.icon} />
                <button onClick={handleUserForm}>Add User</button>
            </div>

            <div className={styles.user__form} style={{top:top}}>
                <UserForm styles={styles} setClose={setTop}/>
            </div>
        </div>
    )
}

export default Navbar;