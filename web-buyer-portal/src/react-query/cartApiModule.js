export const getCart = async () => {
  try {
    const url = process.env.REACT_APP_PRODUCTS_URL;
    const cartId = localStorage.getItem("cartId");

    const response = await fetch(
      `${url}/api/Product/getAddToCartByCartId?CartId=${cartId}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (data.success) {
      return data?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error; // Re-throw the error to be caught by the useQuery hook
  }
};

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
      if (data.success) return data?.data;
      else return [];
    })
    .catch((error) => console.log(error));

  return sealedCart;
};
