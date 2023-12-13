export const searchOrders = async (filterAndSort) => {
  const organisationId = localStorage.getItem("organisationId");

  const orders = await fetch(
    `https://omsupplierfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/OMSupplier/Filter?OrganisationId=${organisationId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterAndSort),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return orders;
};
