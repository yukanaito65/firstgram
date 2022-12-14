import React from 'react'

interface Props{
    data:any
}

function Time(props:Props) {
    const timestamp = props.data.toDate()
    const year = timestamp.getFullYear()
    const month = (timestamp.getMonth()+1)
    const day = timestamp.getDate()
    const hour = timestamp.getHours()
    const min = timestamp.getMinutes()
    
  return (
    <div className='time'
    // style={{marginLeft:"auto",fontSize:"16px"}}
    >
    {/* {year}年{month}月{day}日{hour}:{min} */}
    {min.toString().length === 1 ? (
                    <p className="dmPage__rightMesse--date">
                      {year}.{month}.{day}&nbsp;{hour}:0{min}
                    </p>
                  ) : (
                    <p className="dmPage__rightMesse--date">
                      {year}.{month}.{day}&nbsp;{hour}:{min}
                    </p>
                  )}
    </div>
  )
}

export default Time
