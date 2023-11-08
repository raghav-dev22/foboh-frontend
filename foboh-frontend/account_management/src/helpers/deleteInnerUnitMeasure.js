export const deleteInnerUnitMeasure = async (id) => {
  const response = await fetch(
    `https://masters-api-foboh.azurewebsites.net/api/innerUnitOfMeasure/DeleteOrders?Id=${id}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    })
    .catch((error) => console.log(error));

  return response;
};
