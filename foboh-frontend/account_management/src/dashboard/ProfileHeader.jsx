import React from 'react'

function ProfileHeader() {
  return (
    <>
       <div className="2xl:container 2xl:mx-auto">
      <div className="bg-custom-extraDarkGreen shadow-lg py-3 px-7">
        <div className="block">

          <nav className="flex justify-end gap-5 ">
          <button className='rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	'>Cancel</button>
          <button className='rounded-md	bg-white px-6	py-2.5 text-green text-base	font-medium	'>Save</button>
          </nav>
        </div>
    
      </div>
    </div>
    </>
  )
}

export default ProfileHeader
