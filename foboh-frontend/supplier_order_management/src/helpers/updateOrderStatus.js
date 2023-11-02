export const updateOrderStatus = async (
  customerDetails,
  defaultPaymentTermValue,
  cartCalculations,
  shippingcharges
) => {
  const orderId = localStorage.getItem("orderId");
  const cartId = localStorage.getItem("cartId");
  const total = (
    cartCalculations.total + parseFloat(shippingcharges.price)
  ).toFixed(2);

  const status = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/UpdateOrderByOrderId?OrderId=${orderId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderStatus: "New",
        transactionStatus: "Unpaid",
        orderByEmailID: customerDetails?.deliveryEmail,
        defaultPaymentTerm: [defaultPaymentTermValue?.label],
        totalPrice: cartCalculations?.subTotal,
        cartID: cartId,
        payAmountLong: total,
        shippingNames: shippingcharges?.name,
        shippingcharges: parseFloat(shippingcharges.price),
        gst: cartCalculations.gst,
        wt: cartCalculations.wet,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.removeItem("orderId");
        return true;
      } else return false;
    })
    .catch((error) => console.log(error));

  return status;
};
