export const getAddress = async (type) => {
  const orderId = localStorage.getItem("orderId");

  const addressInfo = await fetch(
    `https://fobohwbppaymentinfoapi20230925100153.azurewebsites.net/api/PaymentInfo/GetWBAddressByOrderId_AddressType?OrderId=${orderId}&AddressType=${type}
    `,
    {
        method : "GET"
    }
  ).then(response => response.json())
  .then(data => {
    return data
  }).catch(error => console.log(error))

  return addressInfo
};
