export const removeToCart = async (productId, buyerId) => {
  const cartId = localStorage.getItem("cartId");
  const removeCart = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/RemoveCart?ProductId=${productId}&CartId=${cartId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId: buyerId,
        productStatus: "",
        productId: productId,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else false;
    })
    .catch((error) => console.log(error));

  return removeCart;
};
