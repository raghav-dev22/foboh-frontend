import React from 'react'


function AddProductHeader() {
    return (
        <>
            <div className="py-6 sm:flex grid items-center justify-between px-6 gap-5">
                <div className="flex justify-start gap-3 items-center">
                    <div className="">
                        <img src="/assets/previousBtn.png" alt="" />
                    </div>
                    <h4 className=" text-2xl		font-semibold	 	text-darkGreen">Add product  </h4>

                </div>

            </div>
        </>
    )
}

export default AddProductHeader
