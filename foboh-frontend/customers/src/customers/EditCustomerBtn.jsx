import React from 'react'

function EditCustomerBtn() {
    return (
        <>
            <button  type='button' className="border-darkGreen shadow-md border rounded	w-fit px-4		h-10	flex justify-center items-center text-base	font-medium gap-2	">
                <div className="">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.586 1.58519C10.7705 1.39417 10.9912 1.2418 11.2352 1.13698C11.4792 1.03216 11.7416 0.976993 12.0072 0.974685C12.2728 0.972377 12.5361 1.02298 12.7819 1.12354C13.0277 1.2241 13.251 1.37261 13.4388 1.5604C13.6266 1.74818 13.7751 1.97148 13.8756 2.21728C13.9762 2.46307 14.0268 2.72643 14.0245 2.99199C14.0222 3.25755 13.967 3.51999 13.8622 3.76399C13.7574 4.008 13.605 4.22869 13.414 4.41319L12.621 5.20619L9.793 2.37819L10.586 1.58519ZM8.379 3.79219L0 12.1712V14.9992H2.828L11.208 6.62019L8.378 3.79219H8.379Z" fill="#147D73" />
                    </svg>

                </div>
                <h6 className="text-darkGreen">Edit</h6>
            </button>
        </>
    )
}

export default EditCustomerBtn
