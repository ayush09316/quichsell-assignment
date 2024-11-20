import React from 'react'

const Button = ({lefticon,text,righticon,handleClick}) => {
  return (
    <button onClick={handleClick} className="dropbtn">
        <img src={lefticon} alt='icon' className='btn-img'/>
        <p>{text}</p>
        <img src={righticon} alt='icon' className='btn-img'/>
        </button>
        
  )
}

export default Button
