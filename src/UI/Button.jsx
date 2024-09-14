import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({children, disabled, to, type, onClick}) {
    
    const className=
    'bg-yellow-400 uppercase font-semibold  text-stone-800 py-3 px-4 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 sm:py-4';

    const base='bg-yellow-400 uppercase font-semibold  text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ';

    const styles={
      round:base+"px-2.5 py-1 md:px-3.5 md:py-2.5 text-xs " ,
      primary: base + "py-3 px-4 md:px-6 md:py-4",
      small: base + 'px-4 py-2 md:px-5 md:py-2.5  text-xs',
      secondary:base + "py-3 px-2.5 md:px-2 md:py-4 text-red-500"
    }


    

      
  

    if(to) return(
        <Link to={to} className={styles[type]}>{children}</Link>
    )

    if(onClick)return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
          {children}
      </button>
    )



  return (
    <button disabled={disabled} className={styles[type]}>
        {children}
    </button>
  )
}
