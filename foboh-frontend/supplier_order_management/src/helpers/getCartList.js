// export const getCartList = async () => {
//   const cartId = localStorage.getItem("cartId");
//   const cartList = await fetch(
//     `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/getAddToCartByCartId?CartId=${cartId}`,
//     {
//       method: "GET",
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) return data.data;
//       else return [];
//     })
//     .catch((error) => console.log(error));

//   return cartList;
// };
