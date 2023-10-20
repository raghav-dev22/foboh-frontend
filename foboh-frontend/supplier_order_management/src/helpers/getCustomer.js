export const getCustomers = async () => {
  const organisationId = localStorage.getItem("organisationId");
  const customers = await fetch(
    `https://suppliercreateorderfobohwebapi-fbh.azurewebsites.net/api/OMSupplier/getCustomer?OrganisationId=${organisationId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

    return customers
};
