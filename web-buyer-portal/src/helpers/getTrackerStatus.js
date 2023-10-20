export const getTrackerStatus = async (orderId) => {
  const orderStatus = await fetch(
    `https://orderhistoryfobohapi-fbh.azurewebsites.net/api/OrderHistory/getStatusTrackingByOrderId?OrderId=${orderId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let status = "";
      if (data.success) {
        status = data?.data[0]?.orderStatus;
      }
      return status;
    })
    .catch((error) => console.log(error));

  return orderStatus;
};
