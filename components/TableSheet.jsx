import React, { useEffect, useState } from 'react';
import styles from '../styles/Table.module.css';
import { useSelector } from 'react-redux'
import TableList from './TableList';
// const styles = {}
let weekDays = [
  'Wed', 'Thu', 'Fri', 'Sat',
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'
]
let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const URL = process.env.NODE_ENV === 'production' ? 'https://attendance-managment.vercel.app' : 'http://localhost:3000';

function TableSheet() {
  const formChanges = useSelector((state) => state.form.value)
  console.log(formChanges)
  const [present, setPresent] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [isDel, setDel] = useState({ isTrue: true, index: '' });

  const [data, setData] = useState([]);
  console.log(data)

  let days = (year, month) => {
    return new Date(year, month+1, 0).getDate();
  }
  let monthInNumber = new Date().getMonth();
  let year = new Date().getFullYear();
  let totalDays = days(year, monthInNumber);
  let d = [];
  for (let i = 0; i < totalDays; i++) {
    d.push(weekDays[i])
  }
  let monthInWords = months[monthInNumber];
  let workDays = ['Mon', 'Tue', 'Wed', 'Thu'];
  let workingDays = [];

  for (let x = 0; x < weekDays.length - 3; x++) {
    for (let y = 0; y < workDays.length; y++) {
      if (weekDays[x] === workDays[y]) {
        workingDays.push(weekDays[x])
      }
    }
  }

  const handleChange = async (id, value, index) => {
    setLoading(true);
    setPresent({ id: id, attendance: value, index: index })
    const response = await fetch(`${URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ id: id, attendance: value, index: index })
    })
    const json = await response.json();
    console.log(json);
    setLoading(false);
    setRefetch(refetch ? false : true);
  }

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await fetch(`${URL}/api/users/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
    });
    const json = await response.json();
    console.log(json);
    setLoading(false);
    setDel({ index: '' })
    setRefetch(refetch ? false : true);
  }

  

  useEffect(() => {
    // fetchData()
    async function fetchData() {
      const response = await fetch(`${URL}/api/users`, {
        method: 'GET',
        headers: { 'Content-Type': "application/json" }
      });
      const json = await response.json();
      setData(json.data);
    }
    fetchData();
  }, [refetch, formChanges])

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.table__head}>
          <div className={styles.table__name}>
            Students Name
          </div>
          <div className={styles.table__month}>
            <div className={styles.month__name}>{monthInWords}</div>
            <div className={styles.days}>
              {
                workingDays.map((item, index) => (<span key={index} className={styles.day}>{item}</span>))
              }
            </div>
          </div>
        </div>
        <div className={styles.table__body}>
          <ul>
            {isLoading && data[0] ? "loading" :
              data?.map((item, index) => (
                <TableList
                  key={index}
                  styles={styles}
                  isDel={isDel}
                  setDel={setDel}
                  item={item}
                  index={index}
                  workingDays={workingDays}
                  handleChange={handleChange}
                  handleDelete={handleDelete}
                />
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TableSheet;