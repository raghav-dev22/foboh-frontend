export const deleteOrder = async () => {
  const orderId = localStorage.getItem("orderId");
  const cartId = localStorage.getItem("cartId");
  const deleteOrderResponse = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/DeleteOrders?OrderId=${orderId}&CartId=${cartId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.removeItem("orderId");
        localStorage.removeItem("cartId");
        return true;
      } else return false;
    })
    .catch((error) => console.log(error));
  return deleteOrderResponse;
};
