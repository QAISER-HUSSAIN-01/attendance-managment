import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {formChanges} from '../store/statemanagement';
const URL = process.env.NODE_ENV === 'production' ? 'https://attendance-managment.vercel.app' : 'http://localhost:3000';
function UserForm({styles,setClose}) {
    const dispatch = useDispatch();
   const [text, setText] = useState('');
   const [isData, setDate]= useState({});
   const [isProgress,setProgress] = useState(false);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setProgress(true);
        setText('');
        const attendanceLength = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']
        const response = await fetch(`${URL}/api/users/add`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:text.toLowerCase(),attendance:attendanceLength})
        })
        const json = await response.json();
        setDate(json);
        dispatch(formChanges(json.data))
        setProgress(false);
    }

    const handleClose = ()=>{
        setClose('-500px')
    }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder='user name' className={styles.form__input} value={text} onChange={(e)=>setText(e.target.value)}/>
        <input type="submit" value={isProgress ? 'In progress' : 'Add'} className={styles.form__button} />
        {isData.success?<p style={{lineHeight:0,color:isData.message === 'user created' ? 'green':'red'}}>{isData.message}</p>:<p style={{display:'none'}}></p>}
        <MdClose className={styles.form__close} onClick={handleClose} />
    </form>
  )
}

export default UserForm;