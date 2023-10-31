export const getBaseUnitMeasure = async () => {
  const organisationId = localStorage.getItem("organisationId");

  const baseUnitMeasureResponse = await fetch(
    `https://masters-api-foboh.azurewebsites.net/api/baseUnitMeasure/get?OrganisationID=${organisationId}`,
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

  return baseUnitMeasureResponse;
};
