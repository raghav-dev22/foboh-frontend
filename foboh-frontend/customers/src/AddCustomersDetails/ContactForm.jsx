import React from 'react'

function ContactForm() {
    return (
        <>
            <div className="flex justify-between mx-auto lg:w-3/5 w-full pb-10 relative	px-4">

                <div className="details-box  flex flex-col gap-2	 items-center justify-center">
                    <div className="box-1 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
                        <p className="text-white font-normal text-xs">1</p>
                    </div>
                    <h5 className="text-base	text-center text-green font-medium	">
                    Customer details
                    </h5>
                </div>
                <div className="line-1 absolute"></div>
                <div className="contact-box flex flex-col gap-2 items-center justify-center">
                    <div className="box-2 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
                        <p className="text-white font-normal text-xs">2</p>
                    </div>
                    <h5 className="text-base	text-center text-green font-medium	">
                    Customer details
                    </h5>
                </div>
                <div className="line-2 absolute"></div>
                <div className="address-box  flex flex-col gap-2 items-center justify-center   ">
                    <div className="box-3 flex justify-center items-center bg-custom-skyBlue w-5	h-5 rounded-full	">
                        <p className="text-white font-normal text-xs">3</p>
                    </div>
                    <h5 className="text-base	text-center text-green font-medium	">
                    Customer details
                    </h5>
                </div>
            </div>
        </>
    )
}

export default ContactForm
