import React from 'react'

import ImportCustomersBtn from './ImportCustomersBtn';
import EditCustomerBtn from './EditCustomerBtn';
import AddCustomerBtn from './AddCustomerBtn';

function ActiveCustomers() {
  return (
    <>
      <div className="py-6 sm:flex grid items-center justify-between px-6 gap-5">
        <div className="">
          <h4 className=" text-2xl	font-semibold pb-2	text-darkGreen"> Customers</h4>
          <p className="text-gray font-medium	 text-sm	">
            140 active customer
          </p>
        </div>
        <div className=" flex-wrap	 flex judstify-center items-center gap-3">
          {/* <ImportProductBtn/> */}
          <ImportCustomersBtn />
          <EditCustomerBtn />
          <AddCustomerBtn title="Add Customer" />
        </div>
      </div>
    </>
  )
}

export default ActiveCustomers
