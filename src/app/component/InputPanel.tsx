import React from 'react'
import Image from 'next/image'
import TakziahLogo from "../../../public/Takziah.svg"
const InputPanel = () => {
  return (
    <div className="fixed top-0 left-0 h-screen lg:w-1/3 m-0
    flex flex-col w-full
    bg-gray-100 text-pink-500 shadow-lg">
      <div className='top-1 flex  flex-col justify-center items-center pt-4 lg:flex-row'>
        <Image src={TakziahLogo} width={60} height={60} alt='Takziah Logo' />
        <h1 className='text-xl text-black'>Takziah Card Generator</h1>
      </div>
      </div>    )
}

export default InputPanel