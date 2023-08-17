import React, { useEffect } from 'react'
import ViewCustomerHeader from "../ViewCustomer/ViewCustomerHeader"
import CustomerAddress from '../ViewCustomer/CustomerAddress'
import OrderDetails from '../ViewCustomer/OrderDetails'
import { useLocation } from 'react-router-dom';
function ViewCustomer() {
  const [data, setCustomerDetails] = React.useState();
  const location = useLocation()
  console.log("params location >>", location?.state?.data)
  useEffect(() => {
    callCustomerDetails()
  }, [])
  const callCustomerDetails = () => {
    fetch(
      `https://fobohwepapifbh.azurewebsites.net/api/Customer/${location?.state?.data?.id}`,
      {
        method: "GET",
      }
    ).then((response) => response.json())
      .then((data) => {
        console.log("Customer data --->", data);
        setCustomerDetails(data)
      })
  }
  return (
    <div className='px-6'>
      <ViewCustomerHeader />
      <CustomerAddress />
      <OrderDetails data={data} />
    </div>
  )
}

export default ViewCustomer
