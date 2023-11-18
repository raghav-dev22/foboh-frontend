export const getSealedCart = async (orderId) => {
  const { buyerId } = JSON.parse(localStorage.getItem("buyerInfo"));
  const sealedCart = await fetch(
    `https://orderhistoryfobohapi-fbh.azurewebsites.net/api/OrderHistory/getAddToCartBySealedBuyerIdOrderId?OrderId=${orderId}&BuyerId=${buyerId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data;
      else return [];
    })
    .catch((error) => console.log(error));

  return sealedCart;
};
