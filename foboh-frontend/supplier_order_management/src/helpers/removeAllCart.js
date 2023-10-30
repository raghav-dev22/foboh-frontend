export const removeAllCart = async (buyerId) => {
  const cartId = localStorage.getItem("cartId");
  const cart = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/RemoveAll?CartId=${cartId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId: buyerId,
        productStatus: "",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    })
    .catch((error) => console.log(error));

  return cart;
};
