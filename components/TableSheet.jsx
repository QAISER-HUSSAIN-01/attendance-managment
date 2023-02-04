import React, { useEffect, useState } from 'react';
import styles from '../styles/Table.module.css';
// const styles = {}
let weekDays = [
  'Wed', 'Thu', 'Fri', 'Sat',
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'
]
let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function TableSheet() {
  const [present, setPresent] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [refetch,setRefetch] = useState(false);

  // console.log(present)
  const [data, setData] = useState([]);
  const URL = process.env.NODE_ENV === 'production' ? 'https://touristapp.vercel.app' : 'http://localhost:3000';
  let days = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
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
    setPresent({id:id,attendance:value,index:index})
    const response = await fetch(`${URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({id:id,attendance:value,index:index})
    })
    const json = await response.json();
    console.log(json);
    setLoading(false);
    setRefetch(refetch ? false: true);
  }

  async function fetchData() {
    const response = await fetch(`${URL}/api/users`, {
      method: 'GET',
      headers: { 'Content-Type': "application/json" }
    });
    const json = await response.json();
    // console.log(json.data);
    // console.log('useeffect running')
    setData(json.data);
  }

  useEffect(() => {
    fetchData()
  }, [refetch])




  // console.log(data)


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
            {isLoading && data ? "loading" :
              data.map((item, index) => (
                <li key={index}>
                  <span className={styles.list__name}>{item.name}</span>
                  <div className={styles.inputs}>
                    {
                      workingDays.map((value, index) => (
                        <input
                          checked={item.attendance[index] === 'present' ? true : item.attendance[index] === 'abscent' ? true : null}
                          style={{ accentColor: item.attendance[index] === 'abscent' ? 'red' : item.attendance[index] === 'present' ? 'green' : 'blue' }}
                          key={index}
                          type="radio"
                          value={'present'}
                          // disabled={item.attendance[index] === 'present' || 'abscent' ? true : false}
                          onChange={(e) => { handleChange(item._id, e.target.value,index) }} />
                      ))
                    }
                  </div>
                </li>
              ))
            }

          </ul>
        </div>
      </div>
    </div>
  )
}

export default TableSheet;