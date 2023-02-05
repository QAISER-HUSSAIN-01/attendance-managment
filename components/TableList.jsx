import React from 'react'
import { MdDelete } from 'react-icons/md'

function TableList({ styles, isDel, setDel, item, index, workingDays, handleChange, handleDelete }) {
    return (
        <li key={index}>
            
            <div className={styles.list__name} key={index}> {isDel.index === index ?
                    <MdDelete key={index} style={{color:'red',fontSize:'24px'}} onClick={() => handleDelete(item._id)} />:
                    <span key={index} onClick={() => setDel({ isTrue: false, index: index })}>{item.name}</span> }
                </div>
            <div className={styles.inputs}>
                {
                    workingDays.map((value, i) => (
                        <select name="" id="" key={i}
                         value={item.attendance[i] === 'present' ? 'P': item.attendance[i] === 'abscent' ? 'A' : '...'  }
                         onChange={(e) => { handleChange(item._id, e.target.value, i)}}
                         disabled={item.attendance[i] === 'present' ? true : item.attendance[i] === 'abscent' ? true: false}
                         style={{color:item.attendance[i] === 'present' ? 'green' : item.attendance[i] === 'abscent' ? 'red': 'black',border:item.attendance[i] === 'present' ? '2px solid green' : item.attendance[i] === 'abscent' ? '2px solid red': '2px solid black'}}
                         >
                            <option value={item.attendance[i] === 'present' ? 'present': item.attendance[i] === 'abscent' ? 'abscent' : '...'  }>{item.attendance[i] === 'present' ? 'P': item.attendance[i] === 'abscent' ? 'A' : '...'  }</option>
                            <option value="present">P</option>
                            <option value="abscent">A</option>
                        </select>

                        // <input
                        //     checked={item.attendance[i] === 'present' ? true : item.attendance[i] === 'abscent' ? true : null}
                        //     style={{ accentColor: item.attendance[i] === 'abscent' ? 'red' : item.attendance[i] === 'present' ? 'green' : 'blue' }}
                        //     key={i}
                        //     type="radio"
                        //     value={'present'}
                        //     disabled={item.attendance[i] === 'present' ? true : false}
                        //     onChange={(e) => { handleChange(item._id, e.target.value, i) }} />
                    ))
                }
            </div>
        </li>
    )
}

export default TableList;