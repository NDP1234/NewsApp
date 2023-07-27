import React from 'react'
import SpinnerImage from './Iphone-spinner-2.gif'
const Spinner=()=> {
    return (
      <div className='text-center'>
        <img src={SpinnerImage} alt="Loading..." />
      </div>
    )
}
export default Spinner;