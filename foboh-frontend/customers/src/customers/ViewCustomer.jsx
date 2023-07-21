import React from 'react'
import ViewCustomerHeader from "../ViewCustomer/ViewCustomerHeader"
import CustomerAddress from '../ViewCustomer/CustomerAddress'
import OrderDetails from '../ViewCustomer/OrderDetails'
function ViewCustomer() {
  return (
    <div className='px-6'>
  <ViewCustomerHeader/>
  <CustomerAddress/>
  <OrderDetails/>
    </div>
  )
}

export default ViewCustomer
