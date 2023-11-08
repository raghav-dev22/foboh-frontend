export const deleteBaseUnitMeasure = async (id) => {
  const response = await fetch(`https://masters-api-foboh.azurewebsites.net/api/baseUnitMeasure/DeleteOrders?Id=${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    });

  return response;
};
