import React from 'react'
import ViewCustomerHeader from "../ViewCustomer/ViewCustomerHeader"
import CustomerAddress from '../ViewCustomer/CustomerAddress'
import OrderDetails from '../ViewCustomer/OrderDetails'
import {useLocation} from 'react-router-dom';
function ViewCustomer() {
  const location = useLocation();
  console.log("location>>",location?.state?.data)
  return (
    <div className='px-6'>
  <ViewCustomerHeader/>
  <CustomerAddress/>
  <OrderDetails data={location?.state?.data}/>
    </div>
  )
}

export default ViewCustomer
