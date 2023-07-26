import React, { Component } from 'react'
import SpinnerImage from './Iphone-spinner-2.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={SpinnerImage} alt="Loading..." />
      </div>
    )
  }
}
