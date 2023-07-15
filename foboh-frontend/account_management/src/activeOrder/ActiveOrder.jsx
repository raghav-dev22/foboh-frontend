import React from 'react'
import CustomCalender from './CustomCalender';
import Filter from './CustomFilter';

function ActiveOrder() {
    return (
        <div>
            <div className="border rounded-md border-inherit bg-white h-16	 px-6 flex justify-between items-center ">
                <div>
                    <h4 className="md:text-2xl text-base	font-medium		md:font-semibold	">Active orders</h4>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <div className="">
                      <CustomCalender/>
                    </div>
                    <div className="">
                        <Filter/>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default ActiveOrder
