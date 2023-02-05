import React from 'react'
import { MdDelete } from 'react-icons/md'

function TableList({ styles, isDel, setDel, item, index, workingDays, handleChange, handleDelete }) {
    return (
        <li key={index}>
            
            <div className={styles.list__name} key={index}> {isDel.index === index ?
                    <MdDelete key={index} onClick={() => handleDelete(item._id)} />:
                    <span key={index} onClick={() => setDel({ isTrue: false, index: index })}>{item.name}</span> }</div>
            <div className={styles.inputs}>
                {
                    workingDays.map((value, i) => (
                        <input
                            checked={item.attendance[i] === 'present' ? true : item.attendance[i] === 'abscent' ? true : null}
                            style={{ accentColor: item.attendance[i] === 'abscent' ? 'red' : item.attendance[i] === 'present' ? 'green' : 'blue' }}
                            key={i}
                            type="radio"
                            value={'present'}
                            // disabled={item.attendance[index] === 'present' || 'abscent' ? true : false}
                            onChange={(e) => { handleChange(item._id, e.target.value, i) }} />
                    ))
                }
            </div>
        </li>
    )
}

export default TableList;