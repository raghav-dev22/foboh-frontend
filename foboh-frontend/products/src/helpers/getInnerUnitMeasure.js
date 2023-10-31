export const getInnerUnitMeasure = async () => {
  const organisationId = localStorage.getItem("organisationId");
  const response = await fetch(
    `https://masters-api-foboh.azurewebsites.net/api/innerUnitOfMeasure/get?OrganisationID=${organisationId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else return [];
    })
    .catch((error) => console.log(error));

  return response;
};
