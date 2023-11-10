export const getAllOrderDetails = async () => {
  const getOrdersDetails = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/TotalOrderDetails?OrganisationId=${localStorage.getItem(
      "organisationId"
    )}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else {
        return {};
      }
    })
    .catch((error) => console.log(error));
  return getOrdersDetails;
};
