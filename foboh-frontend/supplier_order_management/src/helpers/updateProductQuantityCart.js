export const updateProductQuantityCart = async (
  productId,
  buyerId,
  globalPrice,
  quantity,
  success,
  error,
  setErrorData
) => {
  const cartId = localStorage.getItem("cartId");
  let count = 0;
  setTimeout(() => {
    count++;
  }, 5000);

  const update = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/UpdateToCart?ProductId=${productId}&CartId=${cartId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: "",
        cartId: cartId,
        buyerId: buyerId,
        productId: productId,
        globalPrice: globalPrice,
        quantity: quantity,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        count++;
        setErrorData(false);
        success("Quantity updated successfully!");
      } else if (!data.success && data.message) {
        setErrorData(true);
        return error(data.message);
      }
    })
    .catch((error) => console.log(error));

  return update;
};
