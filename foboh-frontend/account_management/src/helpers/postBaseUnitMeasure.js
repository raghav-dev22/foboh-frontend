export const postBaseUnitMeasure = async (unit) => {
  const organisationId = localStorage.getItem("organisationId");
  const body = unit.map((item) => {
    return {
      unit: `${item?.amount} ${item?.bumUnit}`,
      type: item?.type,
    };
  });

  const postBaseUnitMeasureResponse = await fetch(
    `https://masters-api-foboh.azurewebsites.net/api/baseUnitMeasure/CreateBaseUnit?OrganisationID=${organisationId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    })
    .catch((error) => console.log(error));

  return postBaseUnitMeasureResponse;
};
