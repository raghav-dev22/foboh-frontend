// Order details by orderId api
export const getOrderDetails = async (orderId) => {
  const orderDetailsResponse = await fetch(
    `https://omsupplierfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/getOrderDetailsByOrderId?OrderId=${orderId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      return false;
    })
    .catch((error) => console.log(error));

  return orderDetailsResponse;
};
